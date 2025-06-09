"use client"

import type React from "react"
import type { FilterOptions } from "../TutorsScreen/TutorsScreen"
import "./TutorsFilterSection.css"

interface FormOptions {
  genderOptions: Array<{ value: string; label: string }>
  educationLevels: Array<{ value: string; label: string }>
  areas: Array<{ value: string; label: string }>
}

interface TutorsFilterSectionProps {
  formOptions: FormOptions
  filterOptions: FilterOptions
  onFilterChange: (field: keyof FilterOptions, value: string) => void
}

export default function TutorsFilterSection({ formOptions, filterOptions, onFilterChange }: TutorsFilterSectionProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="tutors-filter-section">
      <div className="filter-container">
        <form className="filter-form" onSubmit={handleSearch}>
          <input
            className="filter-input"
            type="text"
            placeholder="Môn học"
            value={filterOptions.subject}
            onChange={(e) => onFilterChange("subject", e.target.value)}
          />
    

          <select
            className="filter-select"
            value={filterOptions.educationLevel}
            onChange={(e) => onFilterChange("educationLevel", e.target.value)}
          >
            {formOptions.educationLevels.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterOptions.area}
            onChange={(e) => onFilterChange("area", e.target.value)}
          >
            {formOptions.areas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className="filter-search-btn" type="submit">
            <span className="search-icon">🔍</span>
            Tìm
          </button>
        </form>
      </div>
    </div>
  )
}
