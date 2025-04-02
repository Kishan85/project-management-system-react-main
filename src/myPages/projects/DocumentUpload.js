import React, { useEffect, useState } from 'react'
import Head from '../../layout/head/Head';
import Content from '../../layout/content/Content';
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    Icon,
    PreviewAltCard,
    Row,
    RSelect,
    DataTable,
    DataTableBody,
    DataTableHead,
    DataTableItem,
    DataTableRow,
    PaginationComponent,
    UserAvatar,
} from '../../components/Component';
import { useForm } from 'react-hook-form';
import classNames from "classnames";
import { DropdownItem, DropdownMenu, DropdownToggle, Form, Label, UncontrolledDropdown } from 'reactstrap';
import { getProjectDDList } from '../../utils/myFunctions';
import { toast } from 'react-toastify';
import { addProjectDocumentAPI, deleteProjectDocumentAPI, getProjectDocumentListAPI, updateProjectDocumentAPI } from '../../api/project';
import { BASE_URL, BASE_URL_IMG } from '../../constants/myConstants';

import { saveAs } from "file-saver";
import useLogout from '../../utils/useLogout';

const DocumentUpload = () => {
    const logout = useLogout();
    const [isOpen, setIsOpen] = useState(false);
    const [showBtn, setShowBtn] = useState([]);
    const [mode, setMode] = useState("Add");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(7);
    const [data, setData] = useState([])
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        reset,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm();
    const formClass = classNames({
        "form-validate": true,
        "is-alter": "",
    });
    useEffect(() => {
        getProjectDDList(setValue, "projectList");
        getProjectDocumentList();
    }, [])

    const getProjectDocumentList = () => {
        const bodyData = {
            //   current_page: currentPage,
            //   item_per_page: itemPerPage,
        };
        getProjectDocumentListAPI(bodyData)
            .then((res) => {
                if (res.data.status === "success") {
                    setData(res.data.data);
                } else if (res.data.status === "failed") {
                    setData([]);
                } else if (res.data.status === "expired") {
                    logout(res.data.message);
                }
            })
            .catch((err) => { });
    };
    const handleProjectChange = (selectedOption) => {
        setValue("project", selectedOption || "");
        trigger("project");
        setRows([
            {
                title: '',
                document: null,
            },
        ]);
    };
    const [rows, setRows] = useState([
        {
            title: '',
            document: [],
        },
    ]);
    const [validationErrors, setValidationErrors] = useState([]);

    const removeRow = (row, index) => {
        const newRows = rows.filter((row, rowIndex) => rowIndex !== index);
        setRows(newRows);
        if (mode == "Edit") {
            const formData = {
                project_id: watch("project").value,
                document_id: row?.id
            };
            deleteProjectDocumentAPI(formData)
                .then((res) => {
                    if (res?.data?.status === "success") {
                        getProjectDocumentList();
                    } else {
                        console.error("API Error:", res?.data);
                    }
                })
                .catch((err) => {
                    console.error("Something went wrong:", err);
                });
        }
    };

    const validateRows = () => {
        const errors = rows.map((row) => ({
            title: !row.title ? "Title is required" : "",
            document: !row.document ? "Document is required" : "",
        }));
        setValidationErrors(errors);
        return errors.every(
            (error) =>
                !error.title &&
                !error.document
        );
    };

    const addNewRow = () => {
        if (!validateRows()) {
            return;
        }
        setRows([
            ...rows,
            {
                title: '',
                document: null,
            },
        ]);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file); // Create local preview URL
        setValue("document", fileUrl)
        trigger("document");
        setRows((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                documentPriview: fileUrl,
                document: file,
            };
            return newData;
        });
        const newErrors = [...validationErrors];
        newErrors[index] = {
            ...newErrors[index],
            document: e ? "" : "Document is required",
        };
        setValidationErrors(newErrors);

    };

    const handleTitleChange = (e, index) => {
        const title = e.target.value;
        setValue("title", title)
        trigger("title");
        setRows((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                title: title,
            };
            return newData;
        });
        const newErrors = [...validationErrors];
        newErrors[index] = {
            ...newErrors[index],
            title: e ? "" : "Title is required",
        };
        setValidationErrors(newErrors);
    };

    // function that loads the want to editted data
    const onEditClick = (item) => {
        // console.log(item, "edit ---");
        setIsOpen(true);
        setMode("Edit")
        setValue("project", {
            value: item?.project_name?.value,
            label: item?.project_name?.label,
        });
        if (item?.documents?.length) {
            setRows(
                item.documents.map((doc) => {
                    const fileUrl = `${BASE_URL_IMG}${doc.file}`;
                    setValue(`documentPriview`, fileUrl);
                    setValue(`document`, fileUrl);
                    console.log(fileUrl, "FILEURL");
                    return {
                        title: doc.document_name,
                        document: fileUrl,
                        documentPriview: fileUrl,
                        id: doc.id,
                    };
                })
            );
        }
    };
    // console.log(watch("document"),"documents");

    const onFormSubmit = (data) => {
        if (!validateRows()) {
            return;
        }
        if (mode == "Edit") {
            const formData = new FormData();
            formData.append("project_id", data?.project?.value);
            rows.forEach((row, index) => {
                formData.append(`title-[${index}]`, row.title || "");
                formData.append(`id`, row?.id || null);
                formData.append(`document-[${index}]`, row.document || null);
            });
            updateProjectDocumentAPI(formData)
                .then((res) => {
                    if (res?.data?.status === "success") {
                        setIsOpen(false)
                        resetFormFields();
                        getProjectDocumentList();
                    } else if (res.data.status == "failed") {
                        toast.error(res.data.message);
                    } else if (res.data.status == "expired") {
                        logout(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error("Something went wrong:", err);
                });
        } else {
            const formData = new FormData();
            formData.append("project_id", data?.project?.value);
            rows.forEach((row, index) => {
                formData.append(`title-[${index}]`, row.title || "");
                formData.append(`document-[${index}]`, row.document || null);
            });
            addProjectDocumentAPI(formData)
                .then((res) => {
                    if (res?.data?.status === "success") {
                        setIsOpen(false)
                        resetFormFields();
                        getProjectDocumentList();
                    } else if (res.data.status == "failed") {
                        toast.error(res.data.message);
                    } else if (res.data.status == "expired") {
                        logout(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error("Something went wrong:", err);
                });
        }
    };
    const resetFormFields = () => {
        setValue("title", "");
        setValue("document", "");
        setValue("project", []);
    };
    // Get current list, pagination
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // const onDownloadDoc = async (row) => {
    //     console.log(row,"row");
    //     const fileUrl = `${row}`;
    //     const link = document.createElement("a");
    //     link.href = fileUrl;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const onDownloadDoc = (row) => {
        console.log(row, "row");
        const url = row?.document;
        const fileName = row?.title;
        saveAs(url, fileName);
    }

    const handleChangeImg = (e, index) => {
        setShowBtn((prev) => {
            const newBtns = [...prev];
            newBtns[index] = true;
            return newBtns;
        });
    };
    return (
        <>
            <Head title="Upload Project Document"></Head>
            <Content>
                <BlockHead size={`sm`}>
                    <div className="nk-block-between">
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Upload Project Document
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <div className="toggle-expand-content">
                                    <ul className="nk-block-tools g-3">
                                        <li className="nk-block-tools-opt">
                                            <Button
                                                color={`primary`}
                                                onClick={() => {
                                                    setIsOpen(!isOpen);
                                                    setMode("Add")
                                                    resetFormFields()

                                                }}
                                            >
                                                <Icon name={`${isOpen ? "minus" : "plus"}`} />
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </div>
                </BlockHead>
                <Block>
                    {isOpen ? (
                        <Row className={`g-gs mb-1`}>
                            <Col lg={`12`} xxl={`12`}>
                                <PreviewAltCard className={`h-100`}>
                                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                                        <Row className={`g-gs`} >
                                            <Col md={`4`}>
                                                <div className="form-group">
                                                    <Label className="from-label" htmlFor="name">
                                                        Project
                                                    </Label>
                                                    <RSelect
                                                        placeholder='Select Project'
                                                        options={watch("projectList")}
                                                        {...register("project", { required: "Please select project." })}
                                                        onChange={handleProjectChange}
                                                        value={watch("project")}
                                                        isDisabled={mode === "Edit"}
                                                    />
                                                    {errors.project && <span className="invalid">{errors.project.message}</span>}

                                                </div>
                                            </Col>
                                        </Row>
                                        {watch("project")?.value && (
                                            <Row className={`g-gs mt-2`}>
                                                <table
                                                    className="table table-bordered table-scroll mt-3"
                                                    id="productTable"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">
                                                                <label className="from-label" htmlFor="title">
                                                                    Title
                                                                </label>
                                                            </th>
                                                            <th scope="col">
                                                                <label className="form-label" htmlFor="file">
                                                                    Document
                                                                </label>
                                                            </th>
                                                            <th scope="col">
                                                                <button
                                                                    className="btn btn-info"
                                                                    id="addProduct"
                                                                    onClick={addNewRow}
                                                                >
                                                                    <Icon name="plus" />
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows?.map((row, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Col md={`10`}>
                                                                        <div className="form-group">
                                                                            <div className="form-control-wrap">
                                                                                <input
                                                                                    placeholder="Enter title"
                                                                                    type="text"
                                                                                    id="title"
                                                                                    className="form-control"
                                                                                    value={row?.title}
                                                                                    onChange={(e) => handleTitleChange(e, index)}
                                                                                />
                                                                                {validationErrors[index]?.title && <span className="invalid">
                                                                                    {validationErrors[index]?.title}</span>}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </td>
                                                                <td>
                                                                    <Col md={`10`} >
                                                                        <div className="col-md-6 col-lg-10">
                                                                            {(row?.document && mode === "Edit" && showBtn[index]) &&
                                                                                (
                                                                                    <>

                                                                                        <input
                                                                                            title="file"
                                                                                            type="file"
                                                                                            className="form-control"
                                                                                            id={`file-${index}`}
                                                                                            onChange={(e) => handleImageChange(e, index)}
                                                                                            placeholder='select file'
                                                                                        />
                                                                                        {validationErrors[index]?.document && (
                                                                                            <span
                                                                                                className="invalid"
                                                                                            >
                                                                                                {validationErrors[index]?.document}
                                                                                            </span>
                                                                                        )}

                                                                                    </>
                                                                                )}
                                                                            {(!row?.document && mode === "Edit") &&
                                                                                (
                                                                                    <>
                                                                                        <input
                                                                                            title="file"
                                                                                            type="file"
                                                                                            className="form-control"
                                                                                            id={`file-${index}`}
                                                                                            onChange={(e) => handleImageChange(e, index)}
                                                                                            placeholder='select file'
                                                                                        />
                                                                                        {validationErrors[index]?.document && (
                                                                                            <span
                                                                                                className="invalid"
                                                                                            >
                                                                                                {validationErrors[index]?.document}
                                                                                            </span>
                                                                                        )}

                                                                                    </>
                                                                                )}
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-10 mt-1">
                                                                            {
                                                                                mode == "Edit" && (
                                                                                    <>
                                                                                        {row?.document && (
                                                                                            <>
                                                                                                {
                                                                                                    !showBtn[index] &&
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-primary me-3"
                                                                                                        onClick={(e) => handleChangeImg(e, index)}
                                                                                                    >
                                                                                                        Change Document
                                                                                                    </button>
                                                                                                }

                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-primary"
                                                                                                    onClick={() => onDownloadDoc(row)}
                                                                                                >
                                                                                                    <Icon name="download" />
                                                                                                </button>
                                                                                            </>
                                                                                        )}
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </div>

                                                                    </Col>
                                                                    {
                                                                        mode == "Add" &&
                                                                        (
                                                                            <>
                                                                                <div className="col-md-6 col-lg-10">
                                                                                    <input
                                                                                        title="file"
                                                                                        type="file"
                                                                                        className="form-control"
                                                                                        id={`file-${index}`}
                                                                                        onChange={(e) => handleImageChange(e, index)}
                                                                                        placeholder='select file'
                                                                                    />
                                                                                    {validationErrors[index]?.document && (
                                                                                        <span
                                                                                            className="invalid"
                                                                                        >
                                                                                            {validationErrors[index]?.document}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }


                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-danger remove"
                                                                        onClick={() => removeRow(row, index)}
                                                                    >
                                                                        <Icon name="trash" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Row>
                                        )}
                                        <Row>
                                            <Col md="3" className={``}>
                                                <div className="form-group" style={{ marginTop: "31px" }}>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        size="md">
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </PreviewAltCard>
                            </Col>
                        </Row>
                    ) : null}

                </Block>
                <Block>
                    <DataTable className={`card-stretch`}>
                        <DataTableBody>
                            <DataTableHead className={`nk-tb-item nk-tb-head`}>
                                <DataTableRow>
                                    <span className="sub-text">Project Name</span>
                                </DataTableRow>
                            </DataTableHead>
                            {currentItems?.map((item) => {
                                return (
                                    <DataTableItem key={item.id}>
                                        <DataTableRow size="xl">
                                            <span>{item?.project_name?.label}</span>
                                        </DataTableRow>
                                        <DataTableRow className="nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1">
                                                <li>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                                            <Icon name="more-h"></Icon>
                                                        </DropdownToggle>
                                                        <DropdownMenu end>
                                                            <ul className="link-list-opt no-bdr">
                                                                <li
                                                                    onClick={() => onEditClick(item)}
                                                                >
                                                                    <DropdownItem
                                                                        tag="a"
                                                                        href=""
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault();
                                                                        }}
                                                                    >
                                                                        <Icon name="edit"></Icon>
                                                                        <span>Edit</span>
                                                                    </DropdownItem>
                                                                </li>
                                                            </ul>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </li>
                                            </ul>
                                        </DataTableRow>
                                    </DataTableItem>
                                );
                            })
                            }
                        </DataTableBody>
                        <div className="card-inner">
                            {data.length > 0 ? (
                                <PaginationComponent
                                    itemPerPage={itemPerPage}
                                    totalItems={data.length}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                />
                            ) : (
                                <div className="text-center">
                                    <span className="text-silent">No projects found</span>
                                </div>
                            )}
                        </div>
                    </DataTable>
                </Block>
            </Content>
        </>
    )
}

export default DocumentUpload;