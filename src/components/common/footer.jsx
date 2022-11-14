import React from 'react'

export default function Footer() {
    if (window.location.pathname === '/') return null;
    return (
       <footer className="main-footer">
        <strong>Copyright © 2022 <b>SEAJOY.</b> </strong>
         All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> Alpha 1.0.0
        </div>
      </footer>

    )
}
