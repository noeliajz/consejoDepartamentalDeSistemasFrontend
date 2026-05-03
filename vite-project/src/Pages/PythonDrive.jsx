import React, { useState, useRef } from 'react'
import axios from 'axios'
import Navbar1 from '../Components/Navbar1'

const API = 'http://localhost:5000/api'

function PythonDrive() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [showFiles, setShowFiles] = useState(false)

  // 👇 ref para limpiar el input
  const fileInputRef = useRef(null)

  // 📋 Cargar archivos
  const loadFiles = async () => {
    const r = await axios.get(`${API}/files`)
    setFiles(r.data)
    setShowFiles(true)
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

    // 👇 limpiar input visualmente
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    alert("Archivo subido correctamente")
  }

  // ⬇️ Descargar
  const handleDownload = (fileId) => {
    window.open(`${API}/download/${fileId}`, '_blank')
  }

  // 🗑️ Eliminar
  const handleDelete = async (fileId) => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este archivo?")
    if (!confirmDelete) return

    await axios.delete(`${API}/delete/${fileId}`)
    loadFiles()
  }

  return (
    <div>
      <Navbar1 />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Gestión de Archivos - Google Drive</h2>

        {/* SUBIR */}
        <div className="card p-3 mb-4">
          <h5>Subir archivo</h5>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control mb-2"
            ref={fileInputRef}
          />
          <button className="btn btn-primary" onClick={handleUpload}>
            Subir archivo
          </button>
        </div>

        {/* BOTÓN VER */}
        <div className="text-center mb-4">
          <button className="btn btn-success" onClick={loadFiles}>
            Ver archivos subidos
          </button>
        </div>

        {/* TABLA */}
        {showFiles && (
          <div className="card p-3">
            <h5 className="mb-3">Listado de archivos</h5>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {files.map(f => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleDownload(f.id)}
                      >
                        Descargar
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(f.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  )
}

export default PythonDrive