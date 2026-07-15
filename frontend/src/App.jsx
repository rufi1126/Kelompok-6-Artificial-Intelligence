import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [loading, setLoading] = useState(false);

  const handleKirim = async () => {
    if (!input.trim() || loading) return;
    
    setLoading(true);
    setJawaban("");
    try {
      // Pastikan backend Anda berjalan di port 8000
      const response = await axios.post('http://127.0.0.1:8000/api/chat/tanya', {
        query: input
      });
      setJawaban(response.data.response);
    } catch (error) {
      console.error("Error:", error);
      // Cek apakah error karena kuota habis (429)
      if (error.response && error.response.status === 429) {
          setJawaban("Mohon maaf, kuota harian sistem sedang penuh (Limit API). Silakan coba kembali besok pagi.");
      } else {
          setJawaban("Terjadi kendala teknis saat menghubungkan ke server. Pastikan API Key aktif dan Backend berjalan.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- DEFINISI STYLE (Profesional, Kalem, Hitam-Biru) ---
  const styles = {
    // Background utama: Hitam Matte agak kebiruan
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0b10', // Sangat gelap, hampir hitam
      color: '#e0e6ed', // Teks abu-abu terang agar tidak menyolok mata
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    // Header: Biru kalem terang
    header: {
      fontSize: '2.5rem',
      fontWeight: '300', // Tipis agar elegan
      color: '#4fa3f7', // Biru muda kalem
      letterSpacing: '1px',
      marginBottom: '10px',
    },
    subHeader: {
      fontSize: '1rem',
      color: '#718096',
      marginBottom: '40px',
      fontWeight: '400',
    },
    // Area Input & Tombol
    inputWrapper: {
      display: 'flex',
      width: '100%',
      maxWidth: '700px',
      gap: '10px',
      marginBottom: '30px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)', // Sangat transparan
      padding: '10px',
      borderRadius: '100px', // Capsule shape
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    inputField: {
      flex: 1,
      padding: '15px 25px',
      backgroundColor: 'transparent', // Menyatu dengan wrapper
      border: 'none',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
    },
    // Tombol: Biru solid yang kalem
    button: {
      padding: '0 30px',
      backgroundColor: loading ? '#2d3748' : '#3182ce', // Biru kalem saat aktif
      color: 'white',
      border: 'none',
      borderRadius: '100px',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Area Jawaban (Glassmorphism effect)
    answerArea: {
      width: '100%',
      maxWidth: '700px',
      backgroundColor: 'rgba(17, 25, 40, 0.75)', // Deep Navy transparan
      backdropFilter: 'blur(12px)', // Efek blur kaca
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      minHeight: '200px',
    },
    answerTitle: {
      color: '#4fa3f7',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '20px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    answerText: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: loading ? '#718096' : '#e2e8f0',
      whiteSpace: 'pre-line', // Menjaga format paragraf dari AI
    },
    // Spinner loading kecil
    spinner: {
      width: '18px',
      height: '18px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '10px'
    }
  };

  // Inject animation keyframes untuk spinner
  const styleTag = (
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        ::placeholder { color: #4a5568; opacity: 1; }
      `}
    </style>
  );

  return (
    <>
      {styleTag}
      <div style={styles.container}>
        <h1 style={styles.header}>Apotek<span style={{fontWeight: '700'}}>AI</span></h1>
        <p style={styles.subHeader}>Asisten Digital Informasi Obat & Kesehatan</p>
        
        <div style={styles.inputWrapper}>
          <input 
            style={styles.inputField}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tuliskan nama obat atau gejala Anda..."
            onKeyPress={(e) => e.key === 'Enter' && handleKirim()}
            disabled={loading}
          />
          <button 
            onClick={handleKirim}
            disabled={loading}
            style={styles.button}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2b6cb0')} // Hover effect
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3182ce')}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Memproses
              </>
            ) : "Tanya AI"}
          </button>
        </div>

        <div style={styles.answerArea}>
          <div style={styles.answerTitle}>
            <div style={{width: '8px', height: '8px', backgroundColor: loading ? '#f6ad55' : '#4fd1c5', borderRadius: '50%'}}></div>
            Respon Asisten
          </div>
          <p style={styles.answerText}>
            {loading ? "Sedang merumuskan jawaban terbaik berdasarkan data medis..." : (jawaban || "Selamat datang. Silakan ajukan pertanyaan Anda mengenai penggunaan obat, efek samping, atau informasi kesehatan umum di atas.")}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;