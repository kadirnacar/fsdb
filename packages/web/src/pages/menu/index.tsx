import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataService } from '../../services/DataService';

export default function Menu() {
  const [products, setProducts] = useState<any[]>([] as any[]);
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    DataService.getList<any>('Product').then((data) => setProducts(data.value.filter((x) => x.categoryId == itemId) || []));
  }, [itemId]);

  const itemTemplate = (product: any) => {
    return (
      // <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2">
      //   <div className="p-4 border-1 surface-border surface-card border-round">
      //     <div className="flex flex-column align-items-center gap-3">
      //       <img
      //         src={`${DataService.BaseUrl}/image/${product.image}`}
      //         className="max-h-22rem"
      //         style={{
      //           width: '100%',
      //           objectFit: 'contain',
      //         }}
      //       />

      //       <div className="text-2xl font-bold">{product.label}</div>
      //       <div className="text-2xl font-bold">{product.description}</div>
      //       <div className="text-2xl font-bold">
      //         {parseFloat(product.price).toFixed(2)}₺
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="col-12">
        <div className="flex flex-column sm:flex-row sm:align-items-start p-4 gap-4">
          <img className="w-9 w-10rem shadow-2 block  mx-auto border-round" src={`${DataService.BaseUrl}/image/${product.image}`} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.label}</div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text font-semibold">${product.description}</span>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const columns = [
    { field: 'id', header: 'ID', hidden: true },
    {
      field: 'image',
      header: 'Resim',
      style: { width: 100 },
      body: (rowData) => {
        return (
          <img
            src={`${DataService.BaseUrl}/image/${rowData.image}`}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}
          />
        );
      },
    },
    {
      field: 'label',
      header: 'Adı',
      sortable: true,
      style: { verticalAlign: 'baseline' },
      body: (rowData) => {
        return (
          <div className="flex flex-column  align-content-start justify-content-between  flex-1 gap-4">
            <div className="flex flex-row align-content-start  align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{rowData.label}</div>
            </div>
            <div className="flex sm:flex-row align-items-end sm:align-items-end gap-3 sm:gap-2">
              <span className="text">{rowData.description}</span>
            </div>
            <div className="flex sm:flex-row align-items-end sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">{parseFloat(rowData.price)?.toFixed(2)}₺</span>
            </div>
          </div>
        );
      },
    },
  ];
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
        hidden={col.hidden}
        style={col.style}
        sortable={col.sortable}
        body={col.body}
      />
    );
  });
  return (
    <DataTable value={products} dataKey="id" className="datatable-responsive" emptyMessage="Kayıt Yok" showHeaders={false}>
      {dynamicColumns}
    </DataTable>
    // <DataView
    //   layout={'grid'}
    //   value={products}
    //   itemTemplate={itemTemplate}
    //   style={{ background: 'none' }}
    // />
  );
}
