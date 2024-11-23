import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/Images/logo2.png';
import icon_shopping_bag from '../asset/Images/icon_shopping_bag.png';
import '../css/styleHeader.css';
import AuthContext from '../Contexts/AuthContext';
import ClientService from '../Services/ClientService';
// import { usePanier } from '../Contexts/PanierContext';


function HeaderComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const navigate = useNavigate();
    const menuRef = useRef(null); // Référence pour le menu
    


    const navigateTo = (route) => {
        navigate(route);
        setActiveLink(route);
        if (window.innerWidth <= 768) {
            setMenuOpen(false); // Fermer le menu après navigation sur les petits écrans
        }
    };

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState); // Basculer l'ouverture/fermeture du menu
    };

    const handleLogoClick = () => {
        if (window.innerWidth <= 768) {
            toggleMenu(); // Basculer le menu lorsque le logo est cliqué sur les petits écrans
        } else {
            navigateTo('/'); // Naviguer vers la page d'accueil sur les grands écrans
        }
    };

    const { isAuthenticated, setIsAuthenticated, setToken } = useContext(AuthContext);
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        ClientService.logout();
        navigate('/');
    }

    // Utiliser useEffect pour détecter les clics à l'extérieur du menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false); // Fermer le menu si clic à l'extérieur
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Nettoyage de l'effet
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header>
            <div id='logo'>
                <img
                    src={logo}
                    alt="logo sweet cookies"
                    onClick={handleLogoClick}
                    className="logo-img"
                />
            </div>
            <ul ref={menuRef} className={menuOpen ? 'open' : ''}>
                <li
                    onClick={() => navigateTo('/')}
                    className={activeLink === '/' ? 'active' : ''}
                >
                    Home
                </li>
                <li onClick={() => navigateTo('/NosCookies')} className={activeLink === '/NosCookies' ? 'active' : ''}>Nos cookies</li>
                <li onClick={() => navigateTo('/NosAssortiments')} className={activeLink === '/NosAssortiments' ? 'active' : ''}>Nos assortiments</li>
                <li onClick={() => navigateTo('/Apropos')} className={activeLink === '/Apropos' ? 'active' : ''}>A propos</li>
                <li onClick={() => navigateTo('/Contact')} className={activeLink === '/Contact' ? 'active' : ''}>Contact</li>
                {isAuthenticated ? <>
                    <div id='header_icons_connecte'>
                        <div id='bouton_deconnexion'>
                            <button className='deconnexion' onClick={logout} title="Déconnexion "><span class="material-icons-outlined">logout</span></button>
                        </div>
                        <li onClick={() => navigateTo('/Profil')} className={activeLink === '/Profil' ? 'active' : ''}>Profil</li>
                        <div id='icon_shopping_bag'>
                            <img src={icon_shopping_bag} alt="icone du panier" onClick={() => navigateTo('/Panier')} title="Panier" />
                        </div>
                    </div>
                    
                </> : <>
                    
                    <div id='header_icons_deconnecte'>
                        <div id='icon_connexion'>
                            <span className="material-icons-outlined" onClick={() => navigateTo('/LoginPage')}>account_circle</span>
                            </div>
                        <div id='icon_shopping_bag'>
                            <img src={icon_shopping_bag} alt="icone du panier" onClick={() => navigateTo('/Panier')} />
                        </div>
                    </div>
                </>}
            </ul>
        </header>
    );
}

export default HeaderComponent;
