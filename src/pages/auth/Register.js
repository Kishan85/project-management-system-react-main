import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewCard,
  Row,
} from "../../components/Component";
import { Label, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createCompanyDemoAccountAPI } from "../../api/dashboard/planList";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout()
  const handleFormSubmit = (data) => {
    setLoading(true);
    const body = {
      company_name: data?.company_name,
      fname: data?.fname,
      lname: data?.lname,
      email: data?.email,
      mobile: data?.mobile,
      address: data?.address,
      subscription_plan_id: location?.state?.plan_id,
    };
    // console.log("data", data);
    createCompanyDemoAccountAPI(body)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          reset();
          setLoading(false);
          navigate(`${process.env.PUBLIC_URL}/auth-success`);
        } else if (res.data.status == "failed") {
          toast.error(res.data.message);
          setLoading(false);
        } else if (res.data.status == "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.log("something went wrong");
      });
    return false;

    setLoading(true);
    setTimeout(() => {
      navigate(`${process.env.PUBLIC_URL}/auth-success`);
    }, 1000);
  };

  return (
    <>
      <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo-dark" />
          </Link>
        </div>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              {/* <BlockTitle tag="h4">Request Demo</BlockTitle> */}
              {/* <BlockDes>
                <p>Create New Dashlite Account</p>
              </BlockDes> */}
            </BlockContent>
          </BlockHead>
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              <Col sm="12">
                <div className="form-group">
                  <label className="form-label" htmlFor="company-name">
                    Company Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="company-name"
                      {...register("company_name", { required: true })}
                      placeholder="Enter your company name"
                      className="form-control-lg form-control"
                    />
                    {errors.company_name && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-2`} sm="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="fname">
                    First Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="fname"
                      {...register("fname", { required: true })}
                      placeholder="Enter your first name"
                      className="form-control-lg form-control"
                    />
                    {errors.fname && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-2`} sm="6">
                <div className="form-group">
                  <label className="form-label" htmlFor="lname">
                    Last Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="lname"
                      {...register("lname", { required: true })}
                      placeholder="Enter your last name"
                      className="form-control-lg form-control"
                    />
                    {errors.lname && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-2`} sm="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Email
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="default-01"
                      {...register("email", { required: true })}
                      className="form-control-lg form-control"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-2`} sm="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="mobile">
                      Mobile
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    {/* <a
                  href="#mobile"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch `}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a> */}
                    <input
                      type={"text"}
                      id="mobile"
                      {...register("mobile", { required: "This field is required" })}
                      placeholder="Enter your mobile"
                      className={`form-control-lg form-control`}
                    />
                    {errors.mobile && <span className="invalid">{errors.mobile.message}</span>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-2`} sm="12">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="address"
                      {...register("address", { required: true })}
                      className="form-control-lg form-control"
                      placeholder="Enter company address"
                    />
                    {errors.address && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </Col>
              <Col className={`mt-5 mb-2`} sm="12">
                <div className="form-group">
                  <ul className="custom-control-group g-3 align-center">
                    <li>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-control custom-control-input"
                          id={"fv-com-sms"}
                          {...register("com", {
                            required: true,
                            onChange: (e) => {
                              setValue("com", e.target.checked); // Set 'com' to true/false based on checkbox state
                            },
                          })}
                          name="com"
                        />
                        {errors.com && (
                          <span id="fv-com-sms" className="invalid">
                            This field is required
                          </span>
                        )}
                        <Label className="custom-control-label" htmlFor={"fv-com-sms"}>
                          I agree to the{" "}
                          <Link target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                            Terms &amp; Condition
                          </Link>{" "}
                          and{" "}
                          <Link target="_blank" to={`${process.env.PUBLIC_URL}/auths/terms`}>
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col className={`mt-2`} sm="12">
                {" "}
                <div className="form-group">
                  <Button type="submit" color="primary" size="lg" className="btn-block">
                    {loading ? <Spinner size="sm" color="light" /> : "Request Demo"}
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
              <strong>Sign in instead</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Register;
