// Home.jsx — Carrusel desde cero con altura dinámica por imagen + mínimo 80vh
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, BASE_URL } from './utils';

const MIN_VH = 80; // mínimo de alto del contenedor (para que el footer no suba)

const Home = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [estado, setEstado] = useState('cargando'); // 'cargando' | 'ok' | 'error' | 'vacio'
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    // refs para autoplay y swipe
    const autoplayRef = useRef(null);
    const hoverRef = useRef(false);
    const touchStartX = useRef(null);
    const touchDeltaX = useRef(0);

    // dimensiones naturales de cada imagen (para calcular la altura real que debe tomar)
    const [dims, setDims] = useState([]); // [{w,h}, ...]

    // frame height calculado
    const [frameHeight, setFrameHeight] = useState('80vh');
    const frameRef = useRef(null);

    // Cargar publicaciones
    useEffect(() => {
        const fetchPublicaciones = async () => {
            setEstado('cargando');
            try {
                const res = await fetch(API_BASE_URL + 'publicaciones');
                if (!res.ok) throw new Error('Respuesta de red no fue ok');
                const data = await res.json();

                if (data && Array.isArray(data.publicaciones)) {
                    if (data.publicaciones.length === 0) {
                        setEstado('vacio');
                    } else {
                        setPublicaciones(data.publicaciones);
                        setEstado('ok');
                        setIndex(0);
                    }
                } else {
                    throw new Error('Formato de datos incorrecto');
                }
            } catch (e) {
                console.error(e);
                setEstado('error');
            }
        };
        fetchPublicaciones();
    }, []);

    // Pre-cargar dimensiones naturales de imágenes para cálculo de altura
    useEffect(() => {
        if (estado !== 'ok') return;
        let cancelled = false;

        const loadDims = async () => {
            const results = await Promise.all(
                publicaciones.map(
                    (pub) =>
                        new Promise((resolve) => {
                            const img = new Image();
                            img.onload = () => resolve({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
                            img.onerror = () => resolve({ w: 1, h: 1 });
                            img.src = `${BASE_URL}${pub.imagen_url}`;
                        })
                )
            );
            if (!cancelled) setDims(results);
        };

        loadDims();
        return () => {
            cancelled = true;
        };
    }, [estado, publicaciones]);

    // Autoplay (pausa al hover)
    useEffect(() => {
        clearInterval(autoplayRef.current);
        if (estado === 'ok' && publicaciones.length > 1 && !hoverRef.current) {
            autoplayRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % publicaciones.length);
            }, 5000);
        }
        return () => clearInterval(autoplayRef.current);
    }, [estado, publicaciones.length]);

    const prev = () => setIndex((p) => (p - 1 + publicaciones.length) % publicaciones.length);
    const next = () => setIndex((p) => (p + 1) % publicaciones.length);
    const goTo = (i) => setIndex(i);

    const onMouseEnter = () => {
        hoverRef.current = true;
        clearInterval(autoplayRef.current);
    };
    const onMouseLeave = () => {
        hoverRef.current = false;
        if (estado === 'ok' && publicaciones.length > 1) {
            autoplayRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % publicaciones.length);
            }, 5000);
        }
    };

    // Swipe (touch)
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove = (e) => {
        if (touchStartX.current != null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };
    const onTouchEnd = () => {
        const threshold = 50; // px
        if (touchDeltaX.current > threshold) prev();
        else if (touchDeltaX.current < -threshold) next();
        touchStartX.current = null;
        touchDeltaX.current = 0;
    };

    const handleRecolectoresClick = () => navigate('/recolectores');
    const handleReportesClick = () => navigate('/reportar');

    // Calcula la altura ideal del frame para la imagen actual, basada en su proporción y el ancho disponible
    const updateFrameHeight = useMemo(
        () => () => {
            const el = frameRef.current;
            if (!el || !dims[index]) return;

            const width = el.clientWidth || 0;
            const { w, h } = dims[index];
            // altura que ocuparía la imagen si ocupa todo el ancho del frame
            const desired = w > 0 ? Math.round((h * width) / w) : 0;

            const minH = Math.round((window.innerHeight * MIN_VH) / 100); // mínimo en px para no subir el footer
            const finalHeight = Math.max(desired, minH);

            setFrameHeight(finalHeight + 'px');
        },
        [dims, index]
    );

    useEffect(() => {
        updateFrameHeight();
    }, [updateFrameHeight]);

    useEffect(() => {
        const onResize = () => updateFrameHeight();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [updateFrameHeight]);

    const styles = `
/* ====== Layout general ====== */
.home { display: flex; flex-direction: column; background: white; min-height: 100vh; }
.home-container {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 6rem 1.5rem 2rem; gap: 2rem; max-width: 1200px; margin: 0 auto; min-height: 100vh;
}
@media (min-width: 992px) {
  .home-container { flex-direction: row; padding: 6rem 1.25rem 2rem; }
}
.home-carousel { width: 100%; display: flex; align-items: center; justify-content: center; }
@media (min-width: 992px) { .home-carousel { width: 50%; order: 2; } }
.home-text { text-align: center; width: 100%; display: flex; flex-direction: column; justify-content: center; }
@media (min-width: 992px) { .home-text { width: 50%; padding: 0 1.25rem; text-align: left; order: 1; } }
.home-h2 { font-size: 2rem; font-weight: 700; margin: 0; color: #205287; }
.home-h1 { font-size: 2.5rem; font-weight: 700; margin: .5rem 0 0; color: #205287; }
@media (min-width: 992px) { .home-h1 { font-size: 3rem; } }
.home-p { margin-top: 1rem; line-height: 1.6; color: #595957; }
.home-cta { display: flex; gap: 1rem; margin-top: 1.25rem; justify-content: center; }
@media (min-width: 992px) { .home-cta { justify-content: flex-start; } }
.btn {
  border: none; border-radius: 999px; padding: .75rem 1.25rem; color: #fff; cursor: pointer;
  box-shadow: 0 8px 24px rgba(0,0,0,.12); transition: background-color 200ms ease, transform 120ms ease;
  background-color: #2b8a3e;
}
.btn:hover { background-color: #1f6a30; }
.btn:active { transform: translateY(1px); }

/* ====== Carrusel desde cero ====== */
.carousel { width: 100%; }
.carousel-frame {
  position: relative;
  background: white; border-radius: 12px; overflow: hidden;
  display: block;
}
.carousel-track {
  width: 100%; display: flex; transition: transform 500ms ease;
}
.carousel-slide {
  flex: 0 0 100%;
  display: flex; align-items: center; justify-content: center; background: white;
}
/* La imagen ocupa el ancho del frame y su altura se calcula con su proporción (JS ajusta el alto del frame) */
.carousel-slide img {
  width: 100%; height: auto; object-fit: contain;
  user-select: none; -webkit-user-drag: none;
}

/* Mensajes de estado con mínimo alto para no subir footer */
.carousel-state {
  min-height: 80vh;
  width: 100%; background: white; color: #333;
  display: flex; align-items: center; justify-content: center;
}

/* Flechas siempre centradas verticalmente y pegadas a bordes */
.carousel-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.35); border: none; color: #fff; font-size: 32px; cursor: pointer;
  border-radius: 10px; transition: background-color 160ms ease, opacity 160ms ease; opacity: .9;
}
.carousel-arrow:hover { background: rgba(0,0,0,.5); opacity: 1; }
.carousel-arrow.left  { left: 8px; }
.carousel-arrow.right { right: 8px; }

/* Dots */
.carousel-dots { display: flex; gap: 8px; justify-content: center; margin-top: 10px; }
.carousel-dot { width: 10px; height: 10px; background: #cbd5e1; border-radius: 999px; border: none; cursor: pointer; transition: transform 120ms ease, background-color 160ms ease; }
.carousel-dot:hover { transform: scale(1.1); }
.carousel-dot.active { background: #2b8a3e; }

/* Foco accesible */
.carousel-arrow:focus-visible, .carousel-dot:focus-visible, .btn:focus-visible { outline: 3px solid #205287; outline-offset: 2px; }
`;

    const renderCarousel = () => {
        if (estado !== 'ok') {
            return (
                <div className="carousel-state">
                    {estado === 'cargando' && <p>Cargando...</p>}
                    {estado === 'error' && <p>Error al cargar publicaciones.</p>}
                    {estado === 'vacio' && <p>No hay publicaciones para mostrar.</p>}
                </div>
            );
        }

        return (
            <div
                className="carousel"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="carousel-frame"
                    ref={frameRef}
                    style={{ height: frameHeight }}
                >
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                        aria-live="polite"
                    >
                        {publicaciones.map((pub) => (
                            <div key={pub.id} className="carousel-slide">
                                <img
                                    src={`${BASE_URL}${pub.imagen_url}`}
                                    alt={pub.titulo || 'Publicación'}
                                    loading="lazy"
                                    draggable={false}
                                    onLoad={updateFrameHeight}
                                />
                            </div>
                        ))}
                    </div>

                    {publicaciones.length > 1 && (
                        <>
                            <button type="button" className="carousel-arrow left" onClick={prev} aria-label="Anterior">‹</button>
                            <button type="button" className="carousel-arrow right" onClick={next} aria-label="Siguiente">›</button>
                        </>
                    )}
                </div>

                {publicaciones.length > 1 && (
                    <div className="carousel-dots" role="tablist">
                        {publicaciones.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot ${i === index ? 'active' : ''}`}
                                onClick={() => { setIndex(i); setTimeout(updateFrameHeight, 0); }}
                                aria-label={`Ir a la diapositiva ${i + 1}`}
                                aria-selected={i === index}
                                role="tab"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="home">
            <style>{styles}</style>

            <div className="home-container">
                {/* Carrusel */}
                <div className="home-carousel">{renderCarousel()}</div>

                {/* Texto */}
                <div className="home-text">
                    <h2 className="home-h2">Hola Vecino,</h2>
                    <h1 className="home-h1">Amarilis Limpio</h1>
                    <p className="home-p">
                        Sistema de reporte y geolocalización de carros recolectores — podrás ver exactamente
                        dónde se encuentra el carro recolector y podrás hacer un reporte de la basura.
                    </p>

                    <div className="home-cta">
                        <button className="btn" onClick={handleRecolectoresClick}>Mi recolector</button>
                        <button className="btn" onClick={handleReportesClick}>Reportar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
