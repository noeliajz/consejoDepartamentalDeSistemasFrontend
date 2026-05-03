import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api'

function PythonDrive() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  // 📋 Listar archivos
  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const r = await axios.get(`${API}/files`)
    setFiles(r.data)
  }

  // 📁 Seleccionar archivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // ⬆️ Subir archivo
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Seleccioná un archivo primero")
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    await axios.post(`${API}/upload`, formData)

    setSelectedFile(null)
    await loadFiles()
  }

  // ⬇️ Descargar archivo
  const handleDownload = (fileId) => {
    window.open(`${API}/download/${fileId}`, '_blank')
  }

  // 🗑️ ELIMINAR ARCHIVO (ACÁ estaba el error)
  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este archivo?")
    if (!confirmDelete) return

    try {
      await axios.delete(`${API}/delete/${fileId}`)
      await loadFiles()
    } catch (error) {
      console.error("Error eliminando:", error)
    }
  }

  return (
    <div>
      <h2>Google Drive</h2>

      {/* INPUT */}
      <input type="file" onChange={handleFileChange} />

      {/* BOTÓN */}
      <button onClick={handleUpload}>
        Subir archivo
      </button>

      <ul>
        {files.map(f => (
          <li key={f.id}>
            {f.name}

            <button onClick={() => handleDownload(f.id)}>
              Descargar
            </button>

            <button onClick={() => handleDelete(f.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PythonDrive