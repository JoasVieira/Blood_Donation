import React, { useState } from 'react'

import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import './styles.css'

/* BOOTSTRAP */
import Container from 'react-bootstrap/Container'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
/*------------------------------------------*/

/* FEATHER ICONS */
import { FiDroplet } from 'react-icons/fi'
/*------------------------------------------*/


export default function Home() {
    const [donnors, setDonnors] = useState([])

    const [show, setShow] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')

    function Show() {
        setShow(!show)
    }

    async function handleRegister(e) {
        const data = {
            name,
            email,
            type
        }

        try {
            await api.post('donnors', data)

        } catch (err) {
            alert('Erro no registro, tente novamente')
        }
    }

    window.onload = () => {
        api.get('donnors').then(res => {
            setDonnors(res.data)
        })
    }

    return (
        <Container className="text-center ">
            <Container>
                <img
                    className="m-3"
                    width={126}
                    src={logoImg}
                    alt="Blood Donation"
                />

                <h3 className="mb-3">A sua doação importa</h3>
                <p>Até 3 vidas por uma doação</p>
                <p>Mais de 38.000 doações são necessárias todos os dias</p>
                <p className="mb-5">Apenas 1,9% da população brasileira, doa sangue</p>

                <Button
                    type="button"
                    variant="danger"
                    onClick={Show}
                    aria-controls="collapse-form"
                    aria-expanded={show}
                    style={{ background: "#FF4F4F", border: "none" }}
                    className="mb-3"
                >
                    Quero ajudar
                </Button>

            </Container>

            <Collapse in={show}>
                <Container
                    className="rounded w-50"
                    id="collapse-form"
                    style={{ background: "#FF4F4F" }}
                >
                    <Row className="p-5">
                        <Col>
                            <h2 className="text-white">Entre na lista de doadores</h2>
                        </Col>
                        <Col>
                            <Form onSubmit={handleRegister}>
                                <Form.Control
                                    required
                                    className="mb-1"
                                    placeholder="Nome Completo"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <Form.Control
                                    required
                                    className="mb-1"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Form.Control
                                    required
                                    className="mb-1"
                                    placeholder="Tipo Sanguíneo"
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                />

                                <Button className="w-100" variant="light" type="submit">Quero ajudar</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Collapse>

            <main className="mt-2">
                <h2>Últimos <span style={{ color: "#FF4F4F" }}>doadores</span></h2>

                <section className="d-inline-flex">
                    {donnors.map(d => (
                        <div className="m-3">
                            <div style={{ color: "#FF4F4F", fontWeight: "700" }}>
                                <FiDroplet size={24} />
                                {d.type}
                            </div>
                            <p>{d.name}</p>
                        </div>
                    ))}
                </section>
                
            </main>

            <hr />
            <footer style={{ fontWeight: "700" }}>Com ❤ NexLabs</footer>
        </Container>
    )
}