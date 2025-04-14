import './developers.css';
import dev1 from './assets/dev1.jpg';
import dev2 from './assets/dev2.png';
import dev3 from './assets/dev3.jpg';
import dev4 from './assets/dev4.jpg';
import dev5 from './assets/dev5.png';

function Developers() {
    return (
        <section>
            <div className="developers-container">
                <h1 className="developers-title">Meet Our Developers</h1>
                <div className="developers-grid">
                    <div className="developer-card">
                        <img src={dev1} alt="Developer 1" className="developer-img" />
                        <p className="developer-name">Pascual Bernard Benauro</p>
                    </div>
                    <div className="developer-card">
                        <img src={dev2} alt="Developer 2" className="developer-img" />
                        <p className="developer-name">Hermainee Cea Maranan</p>
                    </div>
                    <div className="developer-card">
                        <img src={dev3} alt="Developer 3" className="developer-img" />
                        <p className="developer-name">Rheaven <br/>Castino</p>
                    </div>
                    <div className="developer-card">
                        <img src={dev4} alt="Developer 4" className="developer-img" />
                        <p className="developer-name">Pauline Legisma</p>
                    </div>
                    <div className="developer-card">
                        <img src={dev5} alt="Developer 5" className="developer-img" />
                        <p className="developer-name">Jason Christian Manilag</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Developers;
