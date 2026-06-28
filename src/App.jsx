import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import coverImage from '../images/bora_orneles_cover.webp';
import servicesImage from '../images/bora_orneles_services.png';

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

        <form className="customer-form" onSubmit={(e) => e.preventDefault()}>
          {children}
        </form>
      </main>
    </div>
  );
}

function CustomerFormFields() {
  return (
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
        <Button type="submit">Cadastrar</Button>
      </div>
    </div>
  );
}

function TravelPlanFormFields() {
  return (
    <div className="div-3-columns">
      <div>
        <label>
          Número de Cadastro de Cliente *
          <input type="text" name="customer_id" required />
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
          <input type="date" name="start_date" required />
        </label>

        <label>
          Data Fim *
          <input type="date" name="end_date" required />
        </label>
      </div>
      <div>
        <label>
          Propósito da Viagem *
          <input type="text" name="travel_purpose" required />
        </label>

        <Button type="submit">Cadastrar</Button>
      </div>
    </div>
  );
}

function TravelPlansPage() {
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

        <details className="TravelPlansSection" open>
          <summary>Travel Plans</summary>
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
                <tr>
                  <td colSpan="9" className="empty-row">
                    Nenhum plano de viagem cadastrado ainda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </main>
    </div>
  );
}

function ClientsPage() {
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

        <details className="CustomersSection" open>
          <summary>Clientes</summary>
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
                <tr>
                  <td colSpan="12" className="empty-row">
                    Nenhum cliente cadastrado ainda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </main>
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
        <h2>Cadastros</h2>
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
