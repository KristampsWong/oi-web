import React from 'react'

export default function Logo({ size = 50, color = 'black', ...props }) {
  const height = size
  const width = size
  const space = size / 5
  const topLeftX = 0
  const topLeftY = 0

  const topRightX = space
  const topRightY = 0

  const bottomRightX = width
  const bottomRightY = height

  const bottomLeftX = width - space
  const bottomLeftY = height

  const polygonPoints = `${topLeftX},${topLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY} ${bottomLeftX},${bottomLeftY}`

  return (
    <svg height={height} width={width} {...props}>
      <polygon points={polygonPoints} fill={color} />
    </svg>
  )
}
