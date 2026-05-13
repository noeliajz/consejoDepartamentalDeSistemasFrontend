import React, { useState } from 'react'
import axios from 'axios'
import Navbar1 from '../Components/Navbar1'

const API = 'http://localhost:5000/api'

function GoogleDocsDrive() {
  const [items, setItems] = useState([])

  // 📝 Crear Google Doc
  const handleCreateDoc = async () => {
    try {
      const res = await axios.post(`${API}/create-doc`)
      
      const newDoc = {
        id: res.data.documentId,
        name: res.data.title || "Documento sin título",
        type: 'doc'
      }

      setItems(prev => [...prev, newDoc])

      // abrir directamente
      window.open(`https://docs.google.com/document/d/${newDoc.id}/edit`, '_blank')

    } catch (error) {
      console.error(error)
      alert("Error al crear documento")
    }
  }

  // 📊 Crear Google Sheet
  const handleCreateSheet = async () => {
    try {
      const res = await axios.post(`${API}/create-sheet`)

      const newSheet = {
        id: res.data.spreadsheetId,
        name: res.data.title || "Hoja sin título",
        type: 'sheet'
      }

      setItems(prev => [...prev, newSheet])

      window.open(`https://docs.google.com/spreadsheets/d/${newSheet.id}/edit`, '_blank')

    } catch (error) {
      console.error(error)
      alert("Error al crear hoja de cálculo")
    }
  }

  // 🔗 Abrir
  const handleOpen = (item) => {
    if (item.type === 'doc') {
      window.open(`https://docs.google.com/document/d/${item.id}/edit`, '_blank')
    } else {
      window.open(`https://docs.google.com/spreadsheets/d/${item.id}/edit`, '_blank')
    }
  }

  return (
    <div>
      <Navbar1 />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Google Docs & Sheets</h2>

        {/* BOTONES */}
        <div className="card p-3 mb-4 text-center">
          <h5 className="mb-3">Crear</h5>

          <button 
            className="btn btn-primary me-2"
            onClick={handleCreateDoc}
          >
            Crear documento
          </button>

          <button 
            className="btn btn-success"
            onClick={handleCreateSheet}
          >
            Crear hoja de cálculo
          </button>
        </div>

        {/* LISTADO */}
        <div className="card p-3">
          <h5 className="mb-3">Mis archivos</h5>

          {items.length === 0 ? (
            <p className="text-muted">No hay archivos creados</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      {item.type === 'doc' ? 'Documento' : 'Hoja de cálculo'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleOpen(item)}
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

export default GoogleDocsDrive