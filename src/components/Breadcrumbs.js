import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PostTitle from './PostTitle';


function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const separatorSVG = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.68675 13L8 6.68675L1.68675 0.373496L5.91251e-05 2.06018L4.62662 6.68675L5.94572e-05 11.3133L1.68675 13Z" fill="#00244D"/>
      </svg>
    )
  }

  return (
    <nav className="blog-breadcrumbs">
      <ul style={{ listStyleType: 'none', display: 'flex' }}>
        <Link to="/">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62472 0.457112C3.47071 3.90894 -0.0623345 6.40835 0.000833509 6.55801C0.0450927 6.66315 0.635422 6.76471 1.36123 6.79217L2.6435 6.84044V9.7617V12.6831L3.17648 12.8416C3.46967 12.9287 4.45148 13 5.35827 13C7.77154 13 7.83824 12.9257 7.83824 10.2375V8.125H9.50055H11.1629V10.2375C11.1629 12.9257 11.2296 13 13.6428 13C14.5496 13 15.5314 12.9287 15.8246 12.8416L16.3576 12.6831V9.7617V6.84044L17.6399 6.79217C18.3545 6.7652 18.9562 6.66266 18.9992 6.56061C19.0967 6.32954 9.92403 0 9.49182 0C9.39021 0 8.99999 0.205725 8.62472 0.457112Z" fill="#00244D"/>
          </svg>
        </li>
        </Link>
        <li>
          <Link to="/">Início</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={name} style={{ marginLeft: '5px' }}>
              <span className="breadcrumb-separator">{separatorSVG()}</span>
              <Link to={routeTo}><PostTitle slugPost={name}/></Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;