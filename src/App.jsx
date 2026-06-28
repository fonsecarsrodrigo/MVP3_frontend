import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import coverImage from '../images/bora_orneles_cover.webp';
import servicesImage from '../images/bora_orneles_services.png';

const API_BASE_URL = 'http://127.0.0.1:5001';

function SiteHeader() {
  return <header className="site-header" style={{ backgroundImage: `url(${coverImage})` }} />;
}

function Button({ type = 'button', className = '', onClick, children, ...props }) {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

function BackButton({ to = '/' }) {
  const navigate = useNavigate();

  return (
    <Button className="back-button" onClick={() => navigate(to)}>
      ← Voltar
    </Button>
  );
}

function FeedbackModal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(event) => event.stopPropagation()}>
        <p>{message}</p>
        <Button type="button" className="feedback-close-button" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

function FormPage({ title, children }) {
  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton to="/" />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>{title}</h1>
          </div>
          <div className="page-title-cell" />
        </div>

        {children}
      </main>
    </div>
  );
}

function AddTravelButton({ customerId }) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      className="action-button"
      onClick={() =>
        navigate('/travel', {
          state: { customerId },
        })
      }
    >
      Adicionar Viagem
    </Button>
  );
}

function CustomerFormFields() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formRef = React.useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    if (!form) {
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('');

    const payload = {
      full_name: form.full_name.value,
      date_of_birth: form.date_of_birth.value,
      e_mail: form.e_mail.value,
      home_cep: form.home_cep.value,
      home_street: form.home_street.value,
      home_number: form.home_number.value,
      home_city: form.home_city.value,
      home_state: form.home_state.value,
      social_number: form.social_number.value,
    };

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== '') {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/add_customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível cadastrar o cliente.');
      }

      setFeedbackMessage('Cliente cadastrado com sucesso!');
      form.reset();
    } catch (error) {
      setFeedbackMessage(error.message || 'Erro ao cadastrar cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} className="customer-form" onSubmit={handleSubmit}>
      <div className="div-3-columns">
        <div>
          <label>
            Nome Completo *
            <input type="text" name="full_name" required />
          </label>

          <label>
            CPF *
            <input type="text" name="social_number" required />
          </label>

          <label>
            Data de Nascimento *
          </label>
          <label>
            <input type="date" name="date_of_birth" required />
          </label>

          <label>
            Email *
            <input type="email" name="e_mail" required />
          </label>
        </div>
        <div className="div-3-columns">
          <label>
            Endereço Residencial *
            <input type="text" name="home_cep" placeholder="CEP" maxLength="9" required />
            <input type="text" name="home_street" placeholder="Rua" required />
            <input type="text" name="home_number" placeholder="Número" required />
            <input type="text" name="home_city" placeholder="Cidade" required />
            <input type="text" name="home_state" placeholder="Estado (UF)" required maxLength="2" />
          </label>
        </div>

        <div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </Button>
        </div>
      </div>
      {feedbackMessage && <p className="form-feedback">{feedbackMessage}</p>}
      <FeedbackModal message={feedbackMessage} onClose={() => setFeedbackMessage('')} />
    </form>
  );
}

function TravelPlanFormFields() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formRef = React.useRef(null);
  const location = useLocation();
  const prefilledCustomerId = location.state?.customerId || '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    if (!form) {
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('');

    const payload = {
      customer_id: Number(form.customer_id.value),
      origin: form.origin.value,
      destination: form.destination.value,
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      travel_purpose: form.travel_purpose.value,
    };

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== '') {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/add_travel_plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível cadastrar o plano de viagem.');
      }

      setFeedbackMessage('Plano de viagem cadastrado com sucesso!');
      form.reset();
    } catch (error) {
      setFeedbackMessage(error.message || 'Erro ao cadastrar plano de viagem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} className="customer-form" onSubmit={handleSubmit}>
      <div className="div-3-columns">
        <div>
          <label>
            Número de Cadastro de Cliente *
            <input type="text" name="customer_id" defaultValue={prefilledCustomerId} required />
          </label>

          <label>
            Origem *
            <input type="text" name="origin" required />
          </label>

          <label>
            Destino *
            <input type="text" name="destination" required />
          </label>

          <label>
            Data Início *
          </label>
          <label>
            <input type="date" name="start_date" required />
          </label>

          <label>
            Data Fim *
          </label>
          <label>
            <input type="date" name="end_date" required />
          </label>
        </div>
        <div>
          <label>
            Propósito da Viagem *
            <input type="text" name="travel_purpose" required />
          </label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </Button>
        </div>
      </div>
      {feedbackMessage && <p className="form-feedback">{feedbackMessage}</p>}
      <FeedbackModal message={feedbackMessage} onClose={() => setFeedbackMessage('')} />
    </form>
  );
}

function TravelPlansPage() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const loadTravelPlans = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_travel_plans`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Não foi possível carregar os planos de viagem.');
        }

        const plans = result.travel_plans || [];
        setTravelPlans(plans);
        if (plans.length === 0) {
          const message = 'Nenhum plano de viagem cadastrado ainda.';
          setModalMessage(message);
        }
      } catch (error) {
        const message = error.message || 'Erro ao carregar planos de viagem.';
        setErrorMessage(message);
        setModalMessage(message);
      }
    };

    loadTravelPlans();
  }, []);

  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton to="/" />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>Planos de Viagens</h1>
          </div>
          <div className="page-title-cell" />
        </div>

          <div className="table-container">
            <table className="data-table" id="TravelPlansTable">
              <thead>
                <tr>
                  <th>Identificador de Viagem</th>
                  <th>Numero de Cadastro de Cliente</th>
                  <th>Nome Completo</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Data Início</th>
                  <th>Data Fim</th>
                  <th>Propósito da Viagem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {travelPlans.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-row">
                      {errorMessage || 'Nenhum plano de viagem cadastrado ainda.'}
                    </td>
                  </tr>
                ) : (
                  travelPlans.map((plan) => (
                    <tr key={plan.travel_plan_key}>
                      <td>{plan.travel_plan_key}</td>
                      <td>{plan.customer_id}</td>
                      <td>-</td>
                      <td>{plan.origin}</td>
                      <td>{plan.destination}</td>
                      <td>{plan.start_date}</td>
                      <td>{plan.end_date}</td>
                      <td>{plan.travel_purpose}</td>
                      <td>-</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </main>
      <FeedbackModal message={modalMessage} onClose={() => setModalMessage('')} />
    </div>
  );
}

function ClientsPage() {
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get_customers`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Não foi possível carregar os clientes.');
        }

        const list = result.customers || [];
        setCustomers(list);
        if (list.length === 0) {
          const message = 'Nenhum cliente cadastrado ainda.';
          setModalMessage(message);
        }
      } catch (error) {
        const message = error.message || 'Erro ao carregar clientes.';
        setErrorMessage(message);
        setModalMessage(message);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton to="/" />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>Clientes</h1>
          </div>
          <div className="page-title-cell" />
        </div>

          <div className="table-container">
            <table className="data-table" id="CustomersTable">
              <thead>
                <tr>
                  <th>Número de Cadastro</th>
                  <th>Nome Completo</th>
                  <th>CPF</th>
                  <th>Data de Nascimento</th>
                  <th>Email</th>
                  <th>CEP</th>
                  <th>Rua</th>
                  <th>Número</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Identificador Plano de Viagem</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="empty-row">
                      {errorMessage || 'Nenhum cliente cadastrado ainda.'}
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.customer_key}>
                      <td>{customer.customer_key}</td>
                      <td>{customer.full_name}</td>
                      <td>{customer.social_number}</td>
                      <td>{customer.date_of_birth}</td>
                      <td>{customer.e_mail}</td>
                      <td>{customer.home_cep}</td>
                      <td>{customer.home_street}</td>
                      <td>{customer.home_number}</td>
                      <td>{customer.home_city}</td>
                      <td>{customer.home_state}</td>
                      <td>{customer.travel_plan_id ?? '-'}</td>
                      <td><AddTravelButton customerId={customer.customer_key} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </main>
      <FeedbackModal message={modalMessage} onClose={() => setModalMessage('')} />
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <SiteHeader />

      <div className="service-image-card">
        <img src={servicesImage} alt="Bora Orneles Services" />
        <div className="service-image-card-text"></div>
      </div>

      <main className="site-body section-body">
        <h2>Cadastrar</h2>
        <div className="cards-grid">
          <article className="card clickable" onClick={() => navigate('/customer')}>
            <h3>Clientes</h3>
            <p>Registre novos clientes e mantenha seus dados organizados.</p>
          </article>
          <article className="card clickable" onClick={() => navigate('/travel')}>
            <h3>Planos de Viagens</h3>
            <p>Crie e gerencie planos de viagem para seus clientes.</p>
          </article>
        </div>
      </main>

      <main className="site-body section-body">
        <h2>Gerenciar</h2>
        <div className="cards-grid">
          <article className="card clickable" onClick={() => navigate('/clientView')}>
            <h3>Clientes</h3>
            <p>Acesse informações sobre clientes.</p>
          </article>
          <article className="card clickable" onClick={() => navigate('/travelView')}>
            <h3>Planos de Viagens</h3>
            <p>Acesse informações sobre planos de viagem.</p>
          </article>
        </div>
      </main>

      <footer className="site-footer">
        <p>© 2026  Bora Ornelës · Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell" />
          <div className="page-title-cell page-title-center">
            <h1>404 - Página não encontrada</h1>
          </div>
          <div className="page-title-cell" />
        </div>

        <div className="not-found-content">
          <p>A página que você tentou acessar não existe.</p>
          <BackButton to="/" />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/customer"
        element={
          <FormPage title="Cadastro Clientes">
            <CustomerFormFields />
          </FormPage>
        }
      />
      <Route
        path="/travel"
        element={
          <FormPage title="Cadastro de Viagens">
            <TravelPlanFormFields />
          </FormPage>
        }
      />
      <Route path="/travelView" element={<TravelPlansPage />} />
      <Route path="/clientView" element={<ClientsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
