import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip
} from "recharts"

const ChartContainer = React.forwardRef(({ className, children, config, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef(
  ({ active, payload, label, indicator = "dot", hideLabel = false, hideIndicator = false, labelFormatter, labelClassName, ...props }, ref) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className="rounded-lg border bg-background p-2 shadow-md"
        {...props}
      >
        {!hideLabel && (
          <div className="mb-2 border-b pb-2">
            <p className="font-medium">
              {labelFormatter ? labelFormatter(label, payload) : label}
            </p>
          </div>
        )}
        <div className="grid gap-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              {!hideIndicator && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              )}
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="ml-auto text-sm">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = Legend

const ChartLegendContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center gap-4 ${className}`}
      {...props}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  // Re-export Recharts components
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
}
