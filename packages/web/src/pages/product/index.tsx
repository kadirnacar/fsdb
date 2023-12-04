import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Image as ImageControl } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from '../../services/DataService';

export default function Product() {
  let emptyProduct: any = {
    id: '',
    categoryId: '',
    description: '',
    label: '',
    price: '',
    image: '',
  };
  const [categories, setCategories] = useState<any[]>([] as any[]);
  const [products, setProducts] = useState<any[]>([] as any[]);
  const [product, setProduct] = useState<any>(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const toast = useRef<Toast>(null);

  const columns = [
    { field: 'id', header: 'ID', hidden: true },
    {
      field: 'image',
      header: 'Resim',
      style: { width: 170 },
      body: (rowData) => {
        return (
          <ImageControl
            src={`${DataService.BaseUrl}/image/${rowData.image}`}
            width="150"
            style={{ display: 'block', marginTop: 10 }}
          ></ImageControl>
        );
      },
    },
    { field: 'label', header: 'Adı', sortable: true },
    {
      field: 'categoryId',
      header: 'Kategori',
      body: (rowData) => {
        return <>{categories.find((x) => x.id == rowData.categoryId)?.label}</>;
      },
    },
    {
      field: 'price',
      header: 'Fiyat',
      dataType: 'numeric',
      body: (rowData) => {
        return parseFloat(rowData.price).toFixed(2);
      },
    },
    { field: 'description', header: 'Açıklama' },
  ];

  useEffect(() => {
    DataService.getList<any>('Product').then((data) => setProducts(data?.value || []));
    DataService.getList<any>('Category').then((data) => setCategories(data?.value || []));
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
        hidden={col.hidden}
        style={col.style}
        dataType={col.dataType}
        sortable={col.sortable}
        body={col.body}
      />
    );
  });

  const openNew = () => {
    setProduct({ ...emptyProduct, categoryId: product.categoryId });
    setSubmitted(false);
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: any) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Dropdown
            id="categoryId"
            value={product.categoryId}
            onChange={(e) => {
              onInputChange(e, 'categoryId');
            }}
            options={categories}
            optionLabel="label"
            optionValue="id"
            placeholder="Seçiniz"
            showClear
          />
        </div>
        <div className="my-2">
          <Button label="Yeni" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
        </div>
      </React.Fragment>
    );
  };

  const editProduct = (product: any) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
      </>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);
    let _products = [...products];
    let _product: any = { ...product };
    if (product.id) {
      const index = products.findIndex((x) => x.id == _product.id);

      _products[index] = _product;
      await DataService.update<any>('Product', _product);
      setProducts((prevState) => {
        return [..._products];
      });
      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Ürün Güncellendi',
        life: 3000,
      });
    } else {
      _product.id = uuidv4();
      _product.index = products.length;
      await DataService.create<any>('Product', _product);
      _products.push(_product);

      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Ürün Eklendi',
        life: 3000,
      });

      // setProducts(_products);
      setProducts((prevState) => {
        return [..._products];
      });
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const productDialogFooter = (
    <>
      <Button label="İptal" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Kaydet" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, name: string) => {
    const val = (e.target && e.target.value) || '';
    let _product: any = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = async () => {
    await DataService.delete<any>('Product', product.id);
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({
      severity: 'success',
      summary: 'Başarılı',
      detail: 'Silindi',
      life: 3000,
    });
  };

  const deleteProductDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );

  const image = useRef<ImageControl>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const onTemplateSelect = (e) => {};
  const scaleRatio = 250;

  const uploadHandler = async (e: FileUploadHandlerEvent) => {
    let files = e.files;
    console.log('select', canvas);

    var img = new Image();
    img.onload = async () => {
      if (canvas && canvas.current) {
        var hRatio = scaleRatio / img.width;
        var vRatio = scaleRatio / img.height;
        var ratio = Math.min(hRatio, vRatio);
        canvas.current.width = img.width * ratio;
        canvas.current.height = img.height * ratio;
        const ctx = canvas.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

          const imageUrl = canvas.current.toDataURL();
          if (image && image.current && image.current.getImage()) {
            image.current.getImage().src = imageUrl;
          }

          var blobBin = atob(imageUrl.split(',')[1]);
          var array: any[] = [];
          for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
          var fileU = new Blob([new Uint8Array(array)], { type: 'image/png' });

          const ff = new File([fileU], (product?.label ? product.label : 'image') + '.png', {
            type: fileU.type,
          });
          const result = await DataService.upload([ff]);
          product.image = result[0].filename;

          setProduct((prevState) => {
            return {
              ...prevState,
              ...product,
            } as any;
          });

          toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
          });
        }
      }
    };
    img.src = URL.createObjectURL(e.files[0]);
    console.log(img.src);

    e.options.clear();

    // if (FileReader && files && files.length) {
    //   var fr = new FileReader();
    //   fr.onload = function () {
    //     console.log('select:load', image);
    //     if (image && image.current && image.current.getImage()) {
    //       image.current.getImage().src = fr.result as string;
    //     }
    //   };
    //   fr.readAsDataURL(files[0]);
    // }

    return;

    const result = await DataService.upload(e.files);

    product.image = result[0].filename;

    setProduct((prevState) => {
      return {
        ...prevState,
        ...product,
      } as any;
    });

    toast.current?.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            value={products?.filter((x) => !product.categoryId || x.categoryId == product.categoryId) || []}
            dataKey="id"
            className="datatable-responsive"
            emptyMessage="Kayıt Yok"
            tableStyle={{ minWidth: '20rem' }}
          >
            {dynamicColumns}
            <Column body={actionBodyTemplate} headerStyle={{ width: 100 }}></Column>
          </DataTable>

          <Dialog
            visible={productDialog}
            style={{ width: '450px' }}
            header="Ürün Bilgileri"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="label">Adı</label>
              <InputText
                id="label"
                value={product.label}
                onChange={(e) => onInputChange(e, 'label')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.label,
                })}
              />
              {submitted && !product.label && <small className="p-invalid">Bu alan zorunludur.</small>}
            </div>
            <div className="field">
              <label htmlFor="categoryId">Kategori</label>
              <Dropdown
                id="categoryId"
                value={product.categoryId}
                onChange={(e) => onInputChange(e, 'categoryId')}
                options={categories}
                optionLabel="label"
                optionValue="id"
                placeholder="Seçiniz"
              />
            </div>
            <div className="field">
              <label htmlFor="description">Açıklama</label>
              <InputText
                id="description"
                value={product.description}
                onChange={(e) => onInputChange(e, 'description')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.description,
                })}
              />
              {submitted && !product.description && <small className="p-invalid">Bu alan zorunludur.</small>}
            </div>
            <div className="field">
              <label htmlFor="price">Fiyat</label>
              <InputNumber
                value={parseFloat(product.price) || 0}
                onValueChange={(e) => onInputChange(e, 'price')}
                showButtons
                minFractionDigits={2}
                maxFractionDigits={2}
                mode="decimal"
              ></InputNumber>
              {/* <InputText
                id="price"
                value={product.price}
                onChange={(e) => onInputChange(e, 'price')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.price,
                })}
              /> */}
              {submitted && !product.price && <small className="p-invalid">Bu alan zorunludur.</small>}
            </div>
            <div className="field">
              <label>Resim</label>

              <FileUpload
                mode="basic"
                name="files"
                accept="image/*"
                auto
                url={`${DataService.BaseUrl}/api/upload`}
                uploadHandler={uploadHandler}
                customUpload
                maxFileSize={20000000}
                onError={(ev) =>
                  toast.current?.show({
                    severity: 'error',
                    summary: 'Hata',
                    detail: ev.xhr.responseText,
                    life: 3000,
                  })
                }
                onValidationFail={(file) =>
                  toast.current?.show({
                    severity: 'error',
                    summary: 'Hata',
                    detail: file.name,
                    life: 3000,
                  })
                }
                onSelect={onTemplateSelect}
                chooseLabel="Resim Yükle"
              />
              <canvas
                ref={canvas}
                width={scaleRatio}
                height={scaleRatio}
                style={{
                  visibility: 'hidden',
                  display: 'block',
                  marginTop: 10,
                  border: '1px solid',
                  width: 1,
                  height: 1,
                }}
              ></canvas>
              <ImageControl
                src={`${DataService.BaseUrl}/image/${product.image}`}
                ref={image}
                width="250"
                style={{ display: 'block', marginTop: 10 }}
              />
            </div>
            {/* <div className="field">
              <label htmlFor="password">Şifre</label>
              <InputText
                id="password"
                value={product.password}
                onChange={(e) => onInputChange(e, 'password')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.password,
                })}
              />
              {submitted && !product.password && (
                <small className="p-invalid">Bu alan zorunludur.</small>
              )}
            </div> */}
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: '450px' }}
            header="Uyarı"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {product && (
                <span>
                  Eminmisiniz <b>{product.label}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
