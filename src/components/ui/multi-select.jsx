"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Badge } from "./badge"

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  className,
  multiple = false,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value || [])
  const inputRef = useRef(null)

  useEffect(() => {
    setSelected(value || [])
  }, [value])

  const handleSelect = (option) => {
    let updatedSelected

    if (multiple) {
      if (selected.includes(option.value)) {
        updatedSelected = selected.filter((item) => item !== option.value)
      } else {
        updatedSelected = [...selected, option.value]
      }
    } else {
      updatedSelected = [option.value]
      setOpen(false)
    }

    setSelected(updatedSelected)
    onChange(updatedSelected)
  }

  const handleRemove = (item) => {
    const updatedSelected = selected.filter((i) => i !== item)
    setSelected(updatedSelected)
    onChange(updatedSelected)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            selected.length > 0 ? "h-auto" : "h-10",
            className,
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => {
                const selectedOption = options.find((option) => option.value === item)
                return (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="mr-1 mb-1 bg-violet-100 text-violet-800 hover:bg-violet-200"
                  >
                    {selectedOption?.label}
                    {multiple && (
                      <span
                        role="button"
                        tabIndex={0}
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleRemove(item)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleRemove(item)
                          }
                        }}
                      >
                        <X className="h-3 w-3 text-violet-800" />
                      </span>
                    )}
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search..." ref={inputRef} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value) ? "opacity-100 text-violet-500" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

