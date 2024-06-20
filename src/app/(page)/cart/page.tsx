"use client"

import { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 2,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      quantity: 1,
    },
  ])
  const removeFromCart = (id:any) => {
    setCart(cart.filter((item) => item.id !== id))
  }
  const updateQuantity = (id:any, quantity:any) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
            <p className="text-gray-500 dark:text-gray-400">Review and update your cart before checkout.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Product</TableHead>
                <TableHead className="whitespace-nowrap">Price</TableHead>
                <TableHead className="whitespace-nowrap">Quantity</TableHead>
                <TableHead className="whitespace-nowrap">Total</TableHead>
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item:any) => (
                <TableRow key={item.id} className="border-t border-gray-200 dark:border-gray-800">
                  <TableCell className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg"
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="grid gap-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <div>{item.quantity}</div>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </TableCell>
                  <TableCell className="p-4">
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <p className="text-gray-500 dark:text-gray-400">Review your order details before proceeding to checkout.</p>
          </div>
          <div className="flex-1 grid gap-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 my-4" />
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Update Cart
              </Button>
              <Button className="flex-1">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
