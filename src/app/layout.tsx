import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export default function Layout(props: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {props.children}
    </>
  )
}