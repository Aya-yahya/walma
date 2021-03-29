import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import nodemailer from 'nodemailer'
import sendgrid from '@sendgrid/mail'
import Order from '../models/orderModel.js'
import axios from 'axios'

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body.order

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      shippingAddress,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    if (req.body.userInfo) {
      order.user = req.body.userInfo._id
    }
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log(req.body)
  const order = await Order.findById(req.params.id)
    .populate('orderItems.product')
    .populate('user', 'name email')

  if (order) {
    if (req.body.status === 'success') {
      order.orderItems.map((p) => {
        p.product.countInStock = p.product.countInStock - p.qty
        if (p.product.sale.status) {
          p.product.sale.qty = p.product.sale.qty - p.qty
        }
        p.product.save()
      })
      order.isPaid = true
      order.paidAt = Date.now()
      if (order.user) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'Info.walmakwt@gmail.com',
            pass: process.env.GMAIL_PASS,
          },
        })

        var mailOptions = {
          from: 'Info.walmakwt@gmail.com',
          to: order.user.email,
          subject: 'Walma Coffee',
          text: `Your order with Id${order._id} has been paid successfully `,
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json(error)
          } else {
            res.json('Email sent: ' + info.response)
          }
        })
      }
    }

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      payment_id: req.body.paymentId,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  // console.log(req)
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

const payMyOrders = asyncHandler(async (req, res) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.MY_FATOORAH_ID,
      //'Bearer rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL',
    },
  }

  var data1 = JSON.stringify({
    InvoiceAmount: req.body.totalPrice,
    CurrencyIso: 'KWD',
  })

  var config2 = {
    headers: {
      Authorization: 'Bearer ' + process.env.MY_FATOORAH_ID,
      //  'Bearer rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL',
      'Content-Type': 'application/json',
      Cookie:
        'ApplicationGatewayAffinityCORS=3ef0c0508ad415fb05a4ff3f87fb97da; ApplicationGatewayAffinity=3ef0c0508ad415fb05a4ff3f87fb97da',
    },
  }

  var { data } = await axios.post(
    'https://api.myfatoorah.com/v2/InitiatePayment',
    data1,
    config2
  )
  var ServiceCharge

  data.Data.PaymentMethods.map((m) => {
    if (Number(m.PaymentMethodId) === Number(req.body.paymentMethod)) {
      ServiceCharge = m.ServiceCharge
    }
  })
  console.log(ServiceCharge)

  const total = req.body.totalPrice + ServiceCharge

  var dat = JSON.stringify({
    PaymentMethodId: req.body.paymentMethod,
    CustomerName: 'test',
    DisplayCurrencyIso: 'kwd',
    MobileCountryCode: '965',
    CustomerMobile: '12345678',
    CustomerEmail: 'mail@mail.com',
    InvoiceValue: total,

    CallBackUrl: `http://walmakwt.com/order/${req.body._id}/success`,
    ErrorUrl: `http://walmakwt.com/order/${req.body._id}/error`,
    Language: 'en',
    CustomerReference: 'string',
    CustomerCivilId: 'string',
    UserDefinedField: 'string',
    CustomerAddress: {
      Block: 'string',
      Street: 'string',
      HouseBuildingNo: 'string',
      Address: 'Address',
      AddressInstructions: 'Address',
    },
    Suppliers: [
      {
        SupplierCode: 1,
        ProposedShare: null,
        InvoiceShare: total,
      },
    ],
    InvoiceItems: [
      {
        ItemName: 'name',
        Quantity: '1',
        UnitPrice: total,
        Description: 'string',
        Weight: 0.5,
        Width: 10,
        Height: 15,
        Depth: 17,
      },
    ],
    SourceInfo: 'string',
  })

  const { data: data2 } = await axios.post(
    'https://api.myfatoorah.com/v2/ExecutePayment',
    dat,
    config
  )

  res.json(data2)
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name') //populate to get user and id associated with order
  res.json(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDeliverd = true
    order.deliverdAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  payMyOrders,
  updateOrderToDelivered,
}
