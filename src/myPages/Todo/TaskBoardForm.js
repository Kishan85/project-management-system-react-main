import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { ModalBody, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button, Icon } from "../../components/Component";
import { themes } from "./TaskData";
import { ColorOptions } from "../../components/partials/color-select-menu/ColorMenu";
import { createBoardAPI, gettaskBoardListAPI, updateBoardAPI } from "../../api/todo";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";

export const TaskBoardForm = ({ toggle, data, setData, editBoard, taskBoardList }) => {
  const logout = useLogout();
  const { register, handleSubmit, watch, setValue, reset, trigger, formState: { errors } } = useForm();
  const [colorOptions, setColorOptions] = useState(themes);
  const [isLoading, setIsLoading] = useState(themes);

  const handleColorChange = (selectedOption) => {
    setValue("color", selectedOption || "");
    trigger("color");
  };

  useEffect(() => {
    // console.log(editBoard, "editBoard");
    if (editBoard) {
      setValue("id", editBoard.id)
      setValue("title", editBoard.text);
      setValue("color", editBoard && colorOptions.find((item) => item.value === editBoard.theme));
    }
  }, [])


  const submitForm = (bodyData) => {
    console.log(bodyData, "bodydata");
    if (editBoard) {
      const data = {
        id: watch('id'),
        color: bodyData.color,
        title: bodyData.title,
      }
      console.log(data, "editdata");
      updateBoardAPI(data)
        .then((res) => {
          if (res.data.status === "success") {
            taskBoardList()
            toast.success(res.data.message);
            reset();
            toggle()
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
          } else if (res.data.status === "expired") {
            logout(res.data.message)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    } else {
      const data = {
        color: bodyData.color,
        title: bodyData.title,
      }
      createBoardAPI(data)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
            reset();
            toggle()
            taskBoardList()
            // console.log(res.data, "res");
          } else if (res.data.status === "failed") {
            toast.error(res.data.message);
            setIsLoading(false);

          } else if (res.data.status === "expired") {
            logout(res.data.message)
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
    // const Bodydata = {
    //   ...data,
    //   columns: {
    //     ...(data.columns ?? {}), // Ensure columns is an object
    //     ["column-" + bodydata.title]: {
    //       id: "column-" + bodydata.title,
    //       text: bodydata.title,
    //       theme: bodydata.color.value,
    //       tasks: [],
    //     },
    //   },
    //   columnOrder: [...(data.columnOrder ?? []), `column-${bodydata.title}`], // Ensure columnOrder is an array

    // };

    // console.log(Bodydata, "Bodydata");

    // sessionStorage.setItem("taskData", JSON.stringify(Bodydata))

  };

  return (
    <ModalBody>
      <a
        href="#cancel"
        onClick={(ev) => {
          ev.preventDefault();
          toggle();
        }}
        className="close"
      >
        <Icon name="cross-sm"></Icon>
      </a>
      <div className="p-2">
        <h5 className="title">{editBoard ? "Update" : "Add"} Board</h5>
        <div className="mt-4">
          <form className="row gy-4" onSubmit={handleSubmit(submitForm)}>
            <Col className="col-12">
              <div className="form-group">
                <label className="form-label">Board Title</label>
                <input
                  type="text"
                  {...register('title', { required: "This field is required" })}
                  value={watch("title")}
                  onChange={(e) => {
                    setValue("title", e.target.value);
                    trigger("title");
                  }}
                  className="form-control" />
                {errors.title && <span className="invalid">{errors.title.message}</span>}
              </div>
            </Col>
            <Col className="col-12">
              <div className="form-group">
                <label className="form-label">Select Color</label>
                <div className="form-control-select">
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    formatOptionLabel={ColorOptions}
                    options={colorOptions}
                    {...register("color", { required: "Please select color" })}
                    onChange={handleColorChange}
                    value={watch("color")}
                  />
                  {errors.color && <span className="invalid">{errors.color.message}</span>}
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                <li>
                  <Button color="primary" size="md" type="submit">
                    {editBoard ? "Update" : "Add"} Board
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggle();
                    }}
                    className="link link-light"
                  >
                    Cancel
                  </Button>
                </li>
              </ul>
            </Col>
          </form>
        </div>
      </div>
    </ModalBody>
  );
};