import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../services/DataService';

export default function Home() {
  const [categorys, setCategorys] = useState<any[]>([] as any[]);
  const navigate = useNavigate();

  useEffect(() => {
    DataService.getList<any>('Category').then((data) => setCategorys(data.value || []));
  }, []);

  const itemTemplate = (category: any) => {
    return (
      <div
        className="col-12 sm:col-6 xl:col-3 p-2 my-1 border-1 surface-border surface-card border-round"
        style={{ cursor: 'pointer', minHeight: 150, position: 'relative' }}
        onClick={(ev) => {
          navigate(`/menu/${category.id}`);
        }}
      >
        <img
          src={`${DataService.BaseUrl}/image/${category.image}`}
          className="max-h-22rem"
          style={{
            width: '100%',
            objectFit: 'contain',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div
          style={{
            position: 'absolute',
            margin: 5,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: '#cccccc80',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            margin: 0,
            fontWeight: 'bold',
            fontSize: '30px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            // WebkitTextStroke: '1px black',
            color: 'white',
            textShadow:
              '-1px -1px 0 #000,\
              0px -1px 0 #000,\
              1px -1px 0 #000,\
              -1px 1px 0 #000,\
              0px 1px 0 #000,\
              1px 1px 0 #000',
          }}
        >
          {category.label}
        </div>
        {/* <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3">
          

            <div className="text-2xl font-bold">{category.label}</div>
          </div>
        </div> */}
      </div>
    );
  };

  return <DataView layout={'grid'} value={categorys} itemTemplate={itemTemplate} />;
}
