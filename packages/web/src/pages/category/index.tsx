import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { TreeDragDropEvent } from 'primereact/tree';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { DeleteCategory, GetCategories, InsertCategory, UpdateCategory } from '../../../wailsjs/go/db/DB';
import { DataTable } from 'primereact/datatable';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Image as ImageControl } from 'primereact/image';
import { Tooltip } from 'primereact/tooltip';
import { DataService } from '../../services/DataService';

export default function Category() {
  let emptyCategory: any = {
    id: '',
    label: '',
    image: '',
    index: NaN,
    parentId: '',
  };
  const [categorys, setCategorys] = useState<any[]>([] as any[]);
  const [category, setCategory] = useState<any>(emptyCategory);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const toast = useRef<Toast>(null);
  const image = useRef<ImageControl>(null);

  useEffect(() => {
    DataService.getList<any>('Category').then((data) =>
      setCategorys(data.value || [])
    );

    // GetCategories().then((data) => setCategorys(data || []));
  }, []);

  const openNew = () => {
    setCategory(emptyCategory);
    setSubmitted(false);
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category: any) => {
    setCategory(category);
    setDeleteCategoryDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Yeni"
            icon="pi pi-plus"
            severity="success"
            className=" mr-2"
            onClick={openNew}
          />
        </div>
      </React.Fragment>
    );
  };

  const editCategory = (product: any) => {
    setCategory({ ...product });
    setCategoryDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCategoryDialog(false);
  };

  const saveCategory = async () => {
    setSubmitted(true);

    let _categorys = [...categorys];
    let _category: any = { ...category };
    if (category.id) {
      const index = categorys.findIndex((x) => x.id == _category.id);

      _categorys[index] = _category;
      await DataService.update<any>('Category', _category);
      // await UpdateCategory(_category);
      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Category Güncellendi',
        life: 3000,
      });
      setCategoryDialog(false);
      setCategory(emptyCategory);
      const cats = await DataService.getList<any>('Category');
      // const cats = await GetCategories();
      setCategorys(cats.value);
    } else {
      _category.id = uuidv4();
      await DataService.create<any>('Category', _category);
      // await InsertCategory(_category);
      _categorys.push(_category);

      toast.current?.show({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Kamera Eklendi',
        life: 3000,
      });

      setCategoryDialog(false);
      setCategory(emptyCategory);
      const cats = await DataService.getList<any>('Category');
      setCategorys(cats.value);
      // const cats = await GetCategories();
      // setCategorys(cats);
    }
  };

  const productDialogFooter = (
    <>
      <Button label="İptal" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Kaydet" icon="pi pi-check" text onClick={saveCategory} />
    </>
  );

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || '';
    let _category: any = { ...category };
    _category[`${name}`] = val;

    setCategory(_category);
  };

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const deleteCategory = async () => {
    // await DeleteCategory(category.id);
    await DataService.delete<any>('Category', category.id);
    let _categorys = categorys.filter((val) => val.id !== category.id);
    setCategorys(_categorys);
    setDeleteCategoryDialog(false);
    setCategory(emptyCategory);
    toast.current?.show({
      severity: 'success',
      summary: 'Başarılı',
      detail: 'Silindi',
      life: 3000,
    });
  };

  const deleteCategoryDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteCategoryDialog}
      />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteCategory} />
    </>
  );

  const reorder = async (e: TreeDragDropEvent) => {
    await DataService.update<any>('Category', {
      id: e.dragNode.id || '',
      label: e.dragNode.label || '',
      parentId: e.dropNode.id || '',
    });
    const cats = await DataService.getList<any>('Category');
    setCategorys(cats.value);
    // await UpdateCategory({
    //   id: e.dragNode.id || '',
    //   label: e.dragNode.label || '',
    //   parentId: e.dropNode.id || '',
    // });
    // const cats = await GetCategories();
    // setCategorys(cats);
  };

  const getCategoryTree = (cat: any) => {
    return {
      id: cat.id,
      key: cat.id,
      label: cat.label,
      children: categorys
        .filter((x) => x.parentId == cat.id)
        .map((x) => getCategoryTree(x)),
    };
  };

  const nodeTemplate = (node, options) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editCategory(categorys.find((x) => x.id == node.id))}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="warning"
          onClick={() =>
            confirmDeleteCategory(categorys.find((x) => x.id == node.id) as any)
          }
        />
      </>
    );
    return (
      <div
        className={options.className}
        style={{ display: 'block', width: '100%' }}
      >
        {node.label}
        <div style={{ float: 'right' }}>
          <div className="p-inputgroup">
            <Button
              icon="pi pi-pencil"
              size="small"
              onClick={() =>
                editCategory(categorys.find((x) => x.id == node.id))
              }
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              onClick={() =>
                confirmDeleteCategory(
                  categorys.find((x) => x.id == node.id) as any
                )
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const canvas = useRef<HTMLCanvasElement>(null);

  const onTemplateSelect = (e) => {};

  const uploadHandler = async (e: FileUploadHandlerEvent) => {
    var img = new Image();
    img.onload = async () => {
      const scaleRatio = 250;
      if (canvas && canvas.current) {
        var hRatio = scaleRatio / img.width;
        var vRatio = scaleRatio / img.height;
        var ratio = Math.min(hRatio, vRatio);
        canvas.current.width = img.width * ratio;
        canvas.current.height = img.height * ratio;
        const ctx = canvas.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            img.width * ratio,
            img.height * ratio
          );

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

          const ff = new File(
            [fileU],
            (category?.label ? category.label : 'image') + '.png',
            {
              type: fileU.type,
            }
          );
          const result = await DataService.upload([ff]);
          category.image = result[0].filename;

          setCategory((prevState) => {
            return {
              ...prevState,
              ...category,
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
    e.options.clear();
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  const columns = [
    { field: 'index', header: 'Sıra', hidden: true },
    { field: 'id', header: 'ID', hidden: true },
    {
      field: 'image',
      header: 'Resim',
      style: { width: 170 },
      className: 'hide',
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
    { field: 'label', header: 'Adı', sortable: false },
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
        className={col.className}
        sortable={col.sortable}
        body={col.body}
      />
    );
  });

  const onReorderCategory = async (e) => {
    let values: any[] = [...e.value];
    for (let index = 0; index < values.length; index++) {
      const element = values[index];
      if (element.index != index) {
        element.index = index;
        await DataService.update<any>('Category', element);
      }
    }
    setCategorys((prevState) => {
      return [...values] as any;
    });
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            value={categorys.sort((a, b) => {
              if (a.index < b.index) return -1;
              else if (a.index > b.index) return 1;
              return 0;
            })}
            dataKey="id"
            sortField="index"
            className="datatable-responsive"
            emptyMessage="Kayıt Yok"
            tableStyle={{ minWidth: '20rem' }}
            reorderableRows
            onRowReorder={onReorderCategory}
          >
            <Column rowReorder style={{ width: '3rem' }} />
            {dynamicColumns}
            <Column body={nodeTemplate} headerStyle={{ width: 100 }}></Column>
          </DataTable>

          {/* <Tree
            value={categorys
              .filter((x) => x.parentId == '')
              .map((x, i) => {
                return getCategoryTree(x);
              })}
            nodeTemplate={nodeTemplate}
            dragdropScope="kaave"
            onDragDrop={reorder}
            className="w-full"
          /> */}
          <Dialog
            visible={categoryDialog}
            style={{ width: '450px' }}
            header="Kamera Bilgileri"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label>Adı</label>
              <InputText
                id="label"
                value={category.label || ''}
                onChange={(e) => onInputChange(e, 'label')}
                required
                className={classNames({
                  'p-invalid': submitted && !category.label,
                })}
              />
              {submitted && !category.label && (
                <small className="p-invalid">Bu alan zorunludur.</small>
              )}
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
                onSelect={onTemplateSelect}
                chooseLabel="Resim Yükle"
              />
              <canvas
                ref={canvas}
                width={250}
                height={250}
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
                src={`${DataService.BaseUrl}/image/${category.image}`}
                ref={image}
                width="250"
                style={{ display: 'block', marginTop: 10 }}
              />
            </div>
            <div>
              <Toast ref={toast}></Toast>

              <Tooltip
                target=".custom-choose-btn"
                content="Choose"
                position="bottom"
              />
              <Tooltip
                target=".custom-upload-btn"
                content="Upload"
                position="bottom"
              />
              <Tooltip
                target=".custom-cancel-btn"
                content="Clear"
                position="bottom"
              />

              {/* <FileUpload
                ref={fileUploadRef}
                name="files"
                accept="image/*"
                maxFileSize={20000000}
                customUpload={false}

                url={`${DataService.BaseUrl}/api/upload`}
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
              /> */}
            </div>
          </Dialog>

          <Dialog
            visible={deleteCategoryDialog}
            style={{ width: '450px' }}
            header="Uyarı"
            modal
            footer={deleteCategoryDialogFooter}
            onHide={hideDeleteCategoryDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {category && (
                <span>
                  Eminmisiniz <b>{category.label}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
