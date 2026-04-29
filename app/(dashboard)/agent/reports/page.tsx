'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

interface Report {
  id: string
  title: string
  description: string
  location: string
  date: string
  fileName?: string
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected'
  submittedDate: Date
}

const statusConfig = {
  pending: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
  reviewed: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', text: 'Reviewed' },
  resolved: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', text: 'Resolved' },
  rejected: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800', text: 'Rejected' },
}

export default function ReportsPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    file: null as File | null,
  })
  const [fileName, setFileName] = useState('')
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Site Damage Report',
      description: 'Severe structural damage observed on west wall',
      location: '123 Main Street',
      date: '2024-04-15',
      fileName: 'damage_photos.pdf',
      status: 'resolved',
      submittedDate: new Date('2024-04-15'),
    },
    {
      id: '2',
      title: 'Equipment Malfunction',
      description: 'HVAC system not responding to temperature adjustments',
      location: '456 Oak Avenue',
      date: '2024-04-20',
      fileName: 'error_log.txt',
      status: 'reviewed',
      submittedDate: new Date('2024-04-20'),
    },
    {
      id: '3',
      title: 'Safety Concern',
      description: 'Loose electrical outlet on second floor',
      location: '789 Pine Road',
      date: '2024-04-25',
      status: 'pending',
      submittedDate: new Date('2024-04-25'),
    },
  ])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      setFileName(file.name)
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }))
      }
    }
  }

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }))
    setFileName('')
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.date) newErrors.date = 'Date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const newReport: Report = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      fileName: fileName,
      status: 'pending',
      submittedDate: new Date(),
    }

    setReports(prev => [newReport, ...prev])
    setFormData({ title: '', description: '', location: '', date: '', file: null })
    setFileName('')
    setSuccessMessage('Report submitted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id))
  }

  const sortedReports = [...reports].sort((a, b) => b.submittedDate.getTime() - a.submittedDate.getTime())

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className=" bg-card">
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reports</h1>
              <p className="text-foreground/60 mt-1">Submit and track your reports</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12 pt-7">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            ✓ {successMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-foreground mb-5">Submit Report</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Report title"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50"
                  />
                  {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50 resize-none"
                  />
                  {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Report location"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-foreground/50"
                  />
                  {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date
                  </label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Attach File
                  </label>
                  {!fileName ? (
                    <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg bg-card/50 cursor-pointer hover:border-blue-600 transition-colors">
                      <Upload className="w-5 h-5 text-foreground/60" />
                      <span className="text-sm text-foreground/60">Choose file</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm text-blue-900 truncate">{fileName}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Report
                </Button>
              </form>
            </div>
          </div>

          {/* Reports List Section */}
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Sent Reports ({reports.length})</h2>
              
              {sortedReports.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-foreground/60">No reports submitted yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {sortedReports.map(report => {
                    const status = statusConfig[report.status]
                    return (
                      <div
                        key={report.id}
                        className={`border rounded-lg p-6 ${status.bg} ${status.border} bg-card border-border hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">{report.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${status.badge}`}>
                                {status.text}
                              </span>
                              <span className="text-xs text-foreground/60">
                                {new Date(report.submittedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-foreground/80 mb-3 line-clamp-2">{report.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div>
                            <span className="text-foreground/60">Location: </span>
                            <span className="text-foreground font-medium">{report.location}</span>
                          </div>
                          <div>
                            <span className="text-foreground/60">Date: </span>
                            <span className="text-foreground font-medium">{report.date}</span>
                          </div>
                        </div>

                        {report.fileName && (
                          <div className="mb-4 p-2 bg-background rounded border border-border text-xs text-foreground/70">
                            📎 {report.fileName}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 flex items-center justify-center gap-2 text-foreground border-border"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
