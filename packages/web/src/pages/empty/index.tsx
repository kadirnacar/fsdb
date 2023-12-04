import React from 'react';

export default function Empty() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card flex justify-content-center flex-wrap card-container yellow-container">
          <div className="card">
            <h5>Başlık</h5>
            <p>İçerik</p>
          </div>
        </div>
      </div>
    </div>
  );
}
