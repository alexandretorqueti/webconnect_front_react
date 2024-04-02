

// react-boostrap
import {Container, Col, Row, Dropdown,ProgressBar } from 'react-bootstrap'

// components
import Card from '../../../components/Card'
import CustomToggle from '../../../components/dropdowns'

// Datepicker
import Datepicker from '../../../components/datepicker'

// apex-chart
import Chart from "react-apexcharts"

const Admin = () =>{
    const adminChart = {
        options: {
            colors: ["#50b5ff"],
                chart: {
                toolbar: {
                show: false
                },
            },
            forecastDataPoints: {
                count: 2,
            },
            stroke: {
                width: 3,
            },
            grid: {
                show:true,
                strokeDashArray: 7,
            },
            markers: {
                size: 6,
                colors:  '#FFFFFF',
                strokeColors: ["#50b5ff"],
                strokeWidth: 2,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 0,
                shape: "circle",
                radius: 2,
                offsetX: 0,
                offsetY: 0,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                axisBorder: {
                show: false,      
                },
                axisTicks: {
                show: false,     
                },
                tooltip: {
                enabled: false,
                }
            },
        },
        series: [{
            name: 'Total Account',
            data: [42, 30, 25, 40, 57, 71, 86, 71, 108]
        }],
    }

    const adminChart1 = {
        options: {
            colors: ["#50b5ff", "#d592ff"],
            plotOptions: {
                radialBar: {
                    inverseOrder: false,
                    endAngle: 360,
                    hollow: {
                        margin: 5,
                        size: '50%',
                        background: 'transparent',
                        imageWidth: 150,
                        imageHeight: 150,
                        imageClipped: true,
                        position: 'front',
                        dropShadow: {
                          enabled: false,
                          blur: 3,
                          opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        background: '#f2f2f2',
                        strokeWidth: '70%',
                        opacity: 1,
                        margin: 6,
                        dropShadow: {
                            enabled: false,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 600,
                            offsetY: -10
                          },
                          value: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 400,
                            offsetY: 16,
                            formatter: function (val) {
                              return val + '%'
                            }
                        },
                    }
                }
            },
            labels: ['Male', 'Female']
        },
        series: [74, 60],
    }

    const adminChart2 = {
        options: {
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center'
          },
          labels: ['Likes', 'Followers'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }]
          },
          series: [65, 35],
    }
    return(
        <>
        <div id='content-page' className='content-page'>
            <Container>
                <Row as="ul" className="list-unstyled mb-0">
                    <Col md="6" lg="3" as="li">
                        <Card>
                            <Card.Body>
                                <div className="points">
                                    <span>Last Month Posts</span>
                                    <div className="d-flex align-items-center">
                                        <h3>1,032</h3>
                                        <small className="text-success ms-3">+ 57</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" lg="3" as="li">
                        <Card>
                            <Card.Body>
                                <div className="points">
                                    <span>Last Month Followers</span>
                                    <div className="d-flex align-items-center">
                                        <h3>4,50,623</h3>
                                        <small className="text-danger ms-3">- 12,562</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" lg="3" as="li">
                        <Card>
                            <Card.Body>
                                <div className="points">
                                    <span>Last Months Posts Liked</span>
                                    <div className="d-flex align-items-center">
                                        <h3>16,502</h3>
                                        <small className="text-success ms-3">+ 1,056</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" lg="3" as="li">
                        <Card>
                            <Card.Body>
                                <div className="points">
                                    <span>Last Month Comments</span>
                                    <div className="d-flex align-items-center">
                                        <h3>3,90,822</h3>
                                        <small className="text-success ms-3">+ 28,476</small>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8">
                        <Card className="card-block card-stretch card-height">
                            <Card.Header>
                                <h4 className="card-title">New Accounts</h4>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} variant="text-secondary">
                                    This year
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <li><Dropdown.Item href="#">Year</Dropdown.Item></li>
                                        <li><Dropdown.Item href="#">Month</Dropdown.Item></li>
                                        <li><Dropdown.Item href="#">Week</Dropdown.Item></li>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Header>
                            <Card.Body>
                                <Chart options={adminChart.options} series={adminChart.series} type="line" height="198"  />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Customer Gender</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="flex-wrap d-flex align-items-center justify-content-between">
                                    <Col md="4" lg="4" className="d-grid gap gap-3">
                                        <div className="d-flex align-items-start">
                                            <i className="icon material-symbols-outlined filled text-primary mt-1">
                                                fiber_manual_record
                                            </i>
                                            <div className="ms-2" style={{lineHeight: "1.5"}}>
                                                <span className="mb-3">Male Customer</span>
                                                <h6 className="mb-0">74%</h6>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i className="icon material-symbols-outlined filled text-info mt-1">
                                                fiber_manual_record
                                            </i>
                                            <div className="ms-2" style={{lineHeight: "1.5"}}>
                                                <span className="mb-3">Female Customer</span>
                                                <h6 className="mb-0">60%</h6>
                                            </div>
                                        </div>
                                    </Col>
                                    <Chart options={adminChart1.options} className="col-md-8 col-lg-8" series={adminChart1.series}   height="200" type="radialBar"/>
                                    {/* <div id="admin-chart-03" className="col-md-8 col-lg-8 admin-chart-03"></div> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Row>
                            <Col lg="6" md="6" className="col-6">
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="border rounded bg-soft-warning avatar-55 d-flex align-items-center justify-content-center">
                                                <svg width="40" height="40" viewBox="0 0 640 480">
                                                    <path fill="#f93" d="M0 0h640v160H0z"/>
                                                    <path fill="#fff" d="M0 160h640v160H0z"/>
                                                    <path fill="#128807" d="M0 320h640v160H0z"/>
                                                    <g transform="matrix(3.2 0 0 3.2 320 240)"><circle r="20" fill="#008"/>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3>58,992</h3>
                                            <p className="mb-0">Indian Users</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg="6" md="6" className="col-6">
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="border rounded bg-soft-info avatar-55 d-flex align-items-center justify-content-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 640 480"><g strokeWidth="1pt"><path fill="#006" d="M0 0h640v480H0z"/><path fill="#fff" d="M0 0v27.95L307.037 250h38.647v-27.95L38.647 0H0zm345.684 0v27.95L38.647 250H0v-27.95L307.037 0h38.647z"/><path fill="#fff" d="M144.035 0v250h57.614V0h-57.615zM0 83.333v83.333h345.684V83.333H0z"/><path fill="#c00" d="M0 100v50h345.684v-50H0zM155.558 0v250h34.568V0h-34.568zM0 250l115.228-83.334h25.765L25.765 250H0zM0 0l115.228 83.333H89.463L0 18.633V0zm204.69 83.333L319.92 0h25.764L230.456 83.333H204.69zM345.685 250l-115.228-83.334h25.765l89.464 64.7V250z"/><path fill="#fff" fillRule="evenodd" d="M299.762 392.523l-43.653 3.795 6.013 43.406-30.187-31.764-30.186 31.764 6.014-43.406-43.653-3.795 37.68-22.364-24.244-36.495 40.97 15.514 13.42-41.713 13.42 41.712 40.97-15.515-24.242 36.494m224.444 62.372l-10.537-15.854 17.81 6.742 5.824-18.125 5.825 18.126 17.807-6.742-10.537 15.854 16.37 9.718-18.965 1.65 2.616 18.85-13.116-13.793-13.117 13.794 2.616-18.85-18.964-1.65m16.368-291.815l-10.537-15.856 17.81 6.742 5.824-18.122 5.825 18.12 17.807-6.74-10.537 15.855 16.37 9.717-18.965 1.65 2.616 18.85-13.116-13.793-13.117 13.794 2.616-18.85-18.964-1.65m-89.418 104.883l-10.537-15.853 17.808 6.742 5.825-18.125 5.825 18.125 17.808-6.742-10.536 15.853 16.37 9.72-18.965 1.65 2.615 18.85-13.117-13.795-13.117 13.795 2.617-18.85-18.964-1.65m216.212-37.929l-10.558-15.854 17.822 6.742 5.782-18.125 5.854 18.125 17.772-6.742-10.508 15.854 16.362 9.718-18.97 1.65 2.608 18.85-13.118-13.793-13.117 13.793 2.61-18.85-18.936-1.65m-22.251 73.394l-10.367 6.425 2.914-11.84-9.316-7.863 12.165-.896 4.605-11.29 4.606 11.29 12.165.897-9.317 7.863 2.912 11.84"/></g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3>20,145</h3>
                                            <p className="mb-0">Australian Users</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg="6" md="6" className="col-6">
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="border rounded bg-soft-danger avatar-55 d-flex align-items-center justify-content-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 640 480"><defs><clipPath id="a"><path fillOpacity=".67" d="M-88.001 32h640v480h-640z"/></clipPath></defs><g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#a)" transform="translate(88.001 -32)"><path fill="#fff" d="M-128 32h720v480h-720z"/><circle cx="523.08" cy="344.05" r="194.93" fill="#d30000" transform="translate(-168.44 8.618) scale(.76554)"/></g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3>15,852</h3>
                                            <p className="mb-0">Japanese Users</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg="6" md="6" className="col-6">
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="border rounded bg-soft-success avatar-55 d-flex align-items-center justify-content-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 640 480"><g strokeWidth="1pt"><path fill="#229e45" fillRule="evenodd" d="M0 0h640v480H0z"/><path fill="#f8e509" fillRule="evenodd" d="M321.406 435.935l301.483-195.67-303.308-196.2L17.11 240.734l304.296 195.2z"/><path fill="#2b49a3" fillRule="evenodd" d="M452.77 240.005c0 70.328-57.103 127.34-127.544 127.34-70.442 0-127.544-57.012-127.544-127.34s57.104-127.34 127.544-127.34c70.442 0 127.545 57.012 127.545 127.34z"/><path fill="#ffffef" fillRule="evenodd" d="M283.3 316.274L279.357 314l-4.093 2.025.917-4.55-3.162-3.332 4.52-.53 2.124-4.08 1.894 4.22 4.46.81-3.345 3.13m86.098 26.224l-3.94-2.274-4.092 2.025.916-4.55-3.16-3.332 4.52-.53 2.122-4.08 1.894 4.22 4.46.81-3.345 3.13m-36.215-29.993l-3.404-1.964-3.536 1.748.792-3.93-2.73-2.88 3.904-.457 1.834-3.523 1.636 3.645 3.853.7-2.89 2.705m86.865-8.477l-3.342-1.928-3.472 1.718.777-3.858-2.68-2.827 3.833-.45 1.8-3.46 1.607 3.58 3.783.686-2.837 2.657M330.37 265.03l-3.94-2.273-4.093 2.025.916-4.55-3.162-3.332 4.522-.53 2.123-4.08 1.894 4.22 4.46.81-3.346 3.13M225.13 225.52l-3.94-2.274-4.094 2.025.916-4.548-3.16-3.333 4.52-.53 2.122-4.08 1.894 4.22 4.46.81-3.345 3.13m13.283 57.14l-3.94-2.275-4.094 2.025.916-4.548-3.16-3.334 4.52-.53 2.123-4.08 1.894 4.22 4.46.81-3.345 3.132m131.954-67.33l-3.48-2.007-3.616 1.788.81-4.017-2.794-2.944 3.994-.47 1.875-3.603 1.673 3.728 3.94.715-2.955 2.766m-6.665 38.24l-2.74-1.582-2.85 1.408.64-3.164-2.2-2.32 3.145-.368 1.477-2.838 1.318 2.936 3.103.563-2.327 2.18m-142.199 50.422l-2.63-1.518-2.734 1.352.61-3.037-2.11-2.225 3.02-.354 1.416-2.723 1.264 2.818 2.978.54-2.233 2.09m200.14 15.164l-2.144-1.135-2.227 1.01.5-2.27-1.72-1.666 2.46-.265 1.154-2.038 1.03 2.108 2.426.404-1.82 1.563"/><path fill="#ffffef" fillRule="evenodd" d="M219.263 287.603l-2.63-1.518-2.734 1.352.61-3.037-2.11-2.225 3.02-.354 1.416-2.723 1.264 2.818 2.978.54-2.233 2.09"/><path fill="#ffffef" fillRule="evenodd" d="M219.263 287.603l-2.63-1.518-2.734 1.352.61-3.037-2.11-2.225 3.02-.354 1.416-2.723 1.264 2.818 2.978.54-2.233 2.09m42.299 3.048l-2.63-1.52-2.733 1.353.61-3.037-2.11-2.225 3.02-.354 1.416-2.722 1.265 2.817 2.978.54-2.233 2.09m-4.786 16.989l-2.63-1.518-2.734 1.352.612-3.038-2.11-2.225 3.017-.354 1.417-2.724 1.265 2.817 2.977.54-2.233 2.09m87.381-22.301l-2.63-1.52-2.733 1.353.61-3.036-2.11-2.225 3.018-.353 1.417-2.724 1.265 2.817 2.977.54-2.233 2.09m-25.099 3.048l-2.63-1.518-2.734 1.352.612-3.037-2.11-2.225 3.018-.353 1.417-2.724 1.264 2.817 2.98.54-2.234 2.09m-68.8-5.838l-1.648-.952-1.714.847.384-1.902-1.323-1.394 1.89-.222.89-1.706.792 1.765 1.864.34-1.4 1.31m167.838 45.384l-2.63-1.518-2.733 1.35.612-3.035-2.11-2.226 3.017-.354 1.417-2.724 1.264 2.817 2.978.54-2.233 2.09m-20.832 5.844l-2.178-1.26-2.264 1.122.507-2.522-1.748-1.848 2.5-.294 1.174-2.262 1.048 2.34 2.466.45-1.85 1.735m10.371 2.297l-2.03-1.173-2.108 1.044.472-2.344-1.63-1.718 2.33-.274 1.093-2.103.976 2.177 2.296.417-1.723 1.615m29.11-22.761l-1.955-1.13-2.03 1.006.454-2.257-1.567-1.655 2.243-.262 1.053-2.024.94 2.092 2.21.402-1.658 1.553M394.24 327.69l-2.554-1.395-2.652 1.24.594-2.786-2.05-2.043 2.93-.325 1.376-2.5 1.227 2.586 2.89.496-2.167 1.92m.549 14.247l-2.33-1.395-2.418 1.24.542-2.786-1.87-2.044 2.673-.324 1.255-2.5 1.12 2.586 2.635.496-1.977 1.918m-18.929-23.055l-1.955-1.13-2.032 1.006.455-2.257-1.568-1.653 2.242-.263 1.054-2.025.94 2.093 2.213.402-1.66 1.554m-17.781 2.273l-1.954-1.13-2.03 1.006.454-2.257-1.57-1.653 2.244-.263 1.053-2.025.94 2.093 2.21.402-1.658 1.554m-30.408-24.59l-1.955-1.128-2.03 1.004.454-2.257-1.568-1.654 2.243-.264 1.053-2.024.94 2.094 2.212.402-1.66 1.553m3.734 57.024l-1.656-.956-1.72.85.386-1.91-1.33-1.4 1.9-.223.893-1.715.795 1.772 1.874.34-1.407 1.316m-46.131-86.63l-3.942-2.274-4.093 2.025.917-4.548-3.162-3.334 4.52-.53 2.124-4.08 1.894 4.22 4.46.81-3.345 3.132"/><path fill="#fff" fillRule="evenodd" d="M444.368 285.817c1.944-5.083 4.45-12.75 5.783-19.786-67.742-59.508-143.26-89.993-238.68-83.72-3.422 6.558-6.16 13.423-8.47 20.853 113.063-10.786 195.936 39.27 241.37 82.654z"/><path fill="#309e3a" d="M413.914 252.36l2.42 1.323c-.38.858-.48 1.61-.31 2.25.18.645.625 1.208 1.335 1.688.75.515 1.424.74 2.016.68.6-.06 1.045-.306 1.335-.734a1.27 1.27 0 0 0 .225-.863c-.027-.3-.192-.66-.495-1.075-.21-.28-.72-.873-1.53-1.777-1.04-1.16-1.66-2.138-1.86-2.936-.28-1.122-.11-2.14.51-3.06.4-.59.936-1.03 1.612-1.318.686-.29 1.433-.355 2.24-.198.81.157 1.664.54 2.55 1.143 1.453.987 2.33 2.048 2.63 3.184.305 1.138.117 2.253-.565 3.345l-2.404-1.484c.3-.665.375-1.24.218-1.723-.147-.485-.55-.95-1.21-1.397-.676-.46-1.302-.682-1.874-.663a1.01 1.01 0 0 0-.856.468c-.186.277-.228.59-.13.943.13.45.668 1.193 1.625 2.234.953 1.04 1.604 1.89 1.95 2.547.355.657.516 1.34.482 2.05-.023.706-.284 1.427-.778 2.16a4.11 4.11 0 0 1-1.812 1.493c-.76.33-1.57.412-2.437.24-.86-.177-1.794-.607-2.798-1.29-1.462-.992-2.36-2.093-2.687-3.3-.322-1.213-.125-2.523.6-3.925zm-11.478-7.533l2.472 1.22c-.345.872-.417 1.628-.22 2.26.208.637.672 1.183 1.4 1.635.775.482 1.455.68 2.043.596.6-.086 1.037-.346 1.306-.786a1.25 1.25 0 0 0 .19-.87c-.038-.302-.218-.655-.54-1.058-.22-.272-.75-.84-1.597-1.713-1.087-1.117-1.746-2.07-1.978-2.86-.323-1.11-.194-2.133.385-3.077a3.619 3.619 0 0 1 1.56-1.38c.674-.316 1.42-.413 2.23-.29.818.127 1.685.473 2.595 1.04 1.492.926 2.408 1.952 2.753 3.074.35 1.126.21 2.247-.427 3.365l-2.464-1.385c.275-.676.327-1.252.15-1.728-.168-.482-.59-.93-1.264-1.35-.697-.433-1.33-.628-1.9-.586-.37.025-.647.195-.838.504-.172.282-.204.594-.09.944.145.443.714 1.165 1.71 2.168.994 1 1.68 1.822 2.052 2.465.38.64.568 1.318.563 2.027.007.708-.227 1.437-.69 2.193a4.158 4.158 0 0 1-1.75 1.565c-.746.36-1.556.474-2.427.336-.865-.14-1.815-.536-2.848-1.175-1.498-.933-2.438-1.996-2.815-3.19-.374-1.2-.23-2.514.438-3.943zm-14.206-3.807l7.276-11.966 8.837 5.416-1.23 2.026-6.43-3.942-1.615 2.652 5.983 3.668-1.225 2.015-5.984-3.667-1.977 3.256 6.657 4.08-1.228 2.017-9.063-5.557zm-20.692-16.993l1.08-2.1 5.4 2.796-2.546 4.962c-.79.238-1.78.296-2.982.17a9.355 9.355 0 0 1-3.317-.986c-1.3-.673-2.29-1.528-2.976-2.572a5.911 5.911 0 0 1-.974-3.47 8.61 8.61 0 0 1 .977-3.703c.664-1.298 1.53-2.31 2.59-3.04 1.057-.727 2.25-1.09 3.57-1.09 1.008-.002 2.104.306 3.29.916 1.542.8 2.577 1.747 3.104 2.846.54 1.096.638 2.28.298 3.555l-2.728-.82c.14-.702.057-1.356-.25-1.957-.296-.606-.806-1.095-1.527-1.47-1.097-.567-2.146-.67-3.155-.305-1 .363-1.85 1.23-2.554 2.6-.76 1.48-1.005 2.76-.73 3.842.277 1.073.944 1.886 2.008 2.437.524.27 1.1.44 1.73.507.64.066 1.22.05 1.753-.05l.81-1.582-2.872-1.485zm-90.242-22.379l2.034-13.867 4.172.62 1.123 9.826 3.86-9.093 4.188.618-2.033 13.87-2.59-.382 1.6-10.918-4.343 10.512-2.685-.398-1.134-11.32-1.6 10.915-2.592-.382zm-14.108-1.638l1.305-13.96 10.307.974-.217 2.36-7.503-.706-.29 3.095 6.978.657-.22 2.352-6.98-.658-.353 3.8 7.764.73-.22 2.354-10.572-.998z"/><g strokeOpacity=".502"><path fill="#309e3a" d="M216.5 191.28c.04-1.43.284-2.62.736-3.58a6.649 6.649 0 0 1 1.346-1.884c.566-.552 1.18-.956 1.844-1.21.88-.347 1.888-.505 3.023-.475 2.056.06 3.682.744 4.877 2.057 1.205 1.315 1.775 3.114 1.714 5.395-.06 2.26-.72 4.017-1.982 5.264-1.26 1.24-2.914 1.834-4.963 1.777-2.077-.056-3.708-.736-4.9-2.037-1.19-1.308-1.755-3.078-1.694-5.307z"/><path fill="#f7ffff" d="M219.414 191.252c-.043 1.586.29 2.8.997 3.643.708.837 1.625 1.27 2.748 1.3 1.122.03 2.055-.35 2.794-1.138.745-.797 1.14-2.007 1.184-3.633.043-1.605-.277-2.813-.96-3.622-.676-.81-1.595-1.23-2.757-1.262-1.162-.03-2.11.345-2.843 1.128-.733.777-1.12 1.972-1.163 3.584z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M233.052 198.51l.163-14.017 5.933.07c1.494.018 2.574.157 3.244.42.677.257 1.214.71 1.613 1.36s.593 1.385.584 2.215c-.013 1.052-.332 1.918-.956 2.598-.623.675-1.55 1.095-2.777 1.26.605.363 1.104.76 1.49 1.193.397.43.923 1.195 1.585 2.293l1.673 2.754-3.372-.04-2.002-3.074c-.71-1.098-1.198-1.788-1.46-2.072-.265-.29-.545-.487-.842-.593-.297-.11-.77-.17-1.418-.177l-.57-.008-.068 5.852-2.82-.033z"/><path fill="#fff" d="M235.976 190.455l2.086.024c1.353.016 2.198-.03 2.536-.142.337-.112.603-.305.796-.584s.293-.627.3-1.048c.004-.472-.118-.853-.37-1.142-.243-.296-.594-.486-1.05-.567-.23-.034-.915-.06-2.057-.072l-2.2-.026-.04 3.555z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M249.003 185.188l5.147.26c1.16.06 2.04.195 2.64.405a4.68 4.68 0 0 1 2.036 1.396c.553.646.958 1.426 1.218 2.34.26.907.356 2.015.29 3.326-.058 1.153-.252 2.138-.58 2.96-.4 1-.938 1.797-1.618 2.396-.51.453-1.19.79-2.034 1.016-.632.166-1.468.222-2.51.17l-5.295-.27.706-14z"/><path fill="#fff" d="M251.706 187.685l-.468 9.274 2.103.105c.786.042 1.357.025 1.71-.046.46-.093.85-.268 1.16-.526.32-.26.59-.695.81-1.31.223-.62.36-1.47.416-2.553s0-1.918-.16-2.507c-.16-.59-.404-1.053-.73-1.397-.327-.342-.75-.583-1.27-.724-.39-.11-1.157-.193-2.306-.25l-1.264-.067z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M317.63 210.22l3.26-13.63 4.4 1.06c1.666.402 2.737.732 3.21.99.73.392 1.274.996 1.634 1.81.36.81.41 1.755.152 2.84-.2.836-.518 1.504-.958 2-.438.5-.932.854-1.48 1.07-.54.212-1.064.31-1.57.3-.685-.028-1.65-.19-2.89-.49l-1.786-.432-1.23 5.142-2.743-.66z"/><path fill="#fff" d="M323.086 199.552l-.926 3.868 1.5.362c1.082.26 1.82.364 2.218.308a1.85 1.85 0 0 0 1.581-1.448c.12-.496.073-.94-.14-1.33a1.94 1.94 0 0 0-.957-.87c-.312-.143-.96-.332-1.95-.57l-1.324-.32z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M330.606 214.106l4.64-13.22 5.598 1.98c1.408.498 2.387.98 2.937 1.445.56.463.923 1.064 1.093 1.807s.12 1.505-.156 2.286c-.348.992-.928 1.71-1.736 2.153-.806.438-1.817.537-3.032.298.457.54.802 1.076 1.03 1.61.238.536.49 1.43.765 2.683l.704 3.15-3.18-1.126-.913-3.556c-.322-1.27-.562-2.08-.72-2.435-.158-.36-.36-.638-.607-.834-.246-.202-.673-.41-1.286-.627l-.536-.192-1.938 5.52-2.66-.942z"/><path fill="#fff" d="M335.938 207.426l1.967.695c1.276.452 2.09.68 2.445.683.355.005.67-.093.943-.295.272-.2.478-.5.616-.896.155-.445.162-.845.017-1.2-.135-.36-.408-.65-.813-.876-.206-.106-.847-.35-1.924-.73l-2.075-.736-1.177 3.356z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M347.01 213.6c.424-1.363.982-2.444 1.673-3.24a6.58 6.58 0 0 1 1.808-1.45c.696-.377 1.397-.598 2.102-.665.94-.093 1.953.03 3.038.37 1.965.614 3.344 1.717 4.14 3.308.803 1.593.867 3.48.19 5.658-.67 2.162-1.78 3.67-3.33 4.528-1.548.852-3.302.97-5.26.357-1.982-.62-3.37-1.718-4.164-3.294-.793-1.583-.858-3.44-.196-5.57z"/><path fill="#fff" d="M349.826 214.385c-.47 1.514-.48 2.773-.026 3.778.455.996 1.22 1.663 2.293 2 1.073.334 2.07.223 2.996-.336.932-.562 1.64-1.62 2.122-3.172.476-1.535.495-2.783.056-3.75-.432-.962-1.204-1.618-2.313-1.964-1.11-.347-2.123-.243-3.04.312-.915.548-1.61 1.592-2.09 3.133z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M374.305 233.12l6.415-12.45 5.27 2.736c1.326.69 2.23 1.3 2.71 1.84.49.532.768 1.18.835 1.94s-.092 1.505-.47 2.242c-.48.934-1.153 1.564-2.017 1.892-.86.322-1.872.28-3.043-.128.378.598.645 1.18.8 1.74.158.564.288 1.484.387 2.763l.262 3.215-2.993-1.555-.415-3.648c-.145-1.304-.27-2.14-.378-2.512-.105-.377-.27-.682-.487-.91-.214-.233-.61-.5-1.186-.798l-.507-.264-2.677 5.197-2.505-1.3z"/><path fill="#fff" d="M380.503 227.226l1.853.962c1.2.625 1.977.962 2.33 1.016.35.054.675 0 .973-.162.296-.16.54-.428.733-.803.216-.42.276-.814.184-1.186-.087-.374-.315-.702-.685-.98-.19-.134-.79-.465-1.808-.993l-1.952-1.013-1.63 3.16z"/></g><g strokeOpacity=".502"><path fill="#309e3a" d="M426.107 258.704c.797-1.183 1.642-2.056 2.536-2.62a6.609 6.609 0 0 1 2.146-.862 5.45 5.45 0 0 1 2.2-.028c.93.184 1.864.596 2.805 1.235 1.704 1.156 2.708 2.612 3.014 4.366.31 1.758-.173 3.58-1.448 5.472-1.263 1.873-2.758 2.998-4.488 3.37-1.728.365-3.44-.028-5.14-1.182-1.718-1.168-2.732-2.622-3.04-4.362-.303-1.746.168-3.543 1.413-5.39z"/><path fill="#fff" d="M428.578 260.254c-.886 1.316-1.256 2.518-1.112 3.61.15 1.087.69 1.945 1.62 2.578.932.632 1.92.815 2.967.55 1.055-.27 2.037-1.077 2.944-2.425.896-1.33 1.273-2.52 1.13-3.572-.138-1.047-.688-1.898-1.65-2.552s-1.962-.85-3-.583c-1.033.26-1.998 1.06-2.9 2.394z"/></g><path fill="#309e3a" d="M301.824 204.523l2.248-9.84 7.268 1.675-.378 1.662-5.287-1.217-.504 2.18 4.926 1.136-.382 1.655-4.918-1.132-.614 2.677 5.475 1.26-.378 1.66-7.456-1.717z"/></g></svg>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3>10,541</h3>
                                            <p className="mb-0">Brazilian Users</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="8">
                        <Card className="card-block card-stretch card-height">
                            <Card.Header>
                                <h4 className="card-title">Worldwide Users</h4>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} variant="text-secondary">
                                        This year
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end">
                                        <li><Dropdown.Item href="#">Year</Dropdown.Item></li>
                                        <li><Dropdown.Item href="#">Month</Dropdown.Item></li>
                                        <li><Dropdown.Item href="#">Week</Dropdown.Item></li>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Header>
                            <Card.Body>
                                <iframe title="googlemap" className="w-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin" height="280" allowFullScreen=""></iframe>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4" md="6">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Calendar</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <div className="input-group d-block">
                                    <Datepicker className="vanila-datepicker" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4" md="6">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Categories</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mt-2 text-dark">
                                        <h6>Video hosting</h6>
                                        <small>62%</small>
                                    </div>
                                    <ProgressBar variant="danger" className="mt-2" now={62} style={{height: "6px"}}/>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mt-2 text-dark">
                                        <h6>Image sharing</h6>
                                        <small>46%</small>
                                    </div>
                                    <ProgressBar variant="info" className="mt-2" now={46} style={{height: "6px"}}/>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mt-2 text-dark">
                                        <h6>Community blogs</h6>
                                        <small>79%</small>
                                    </div>
                                    <ProgressBar variant="primary" className="mt-2" now={79} style={{height: "6px"}}/>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mt-2 text-dark">
                                        <h6>Stories</h6>
                                        <small>34%</small>
                                    </div>
                                    <ProgressBar variant="success" className="mt-2" now={34} style={{height: "6px"}}/>
                                </div>
                                <div className="">
                                    <div className="d-flex justify-content-between mt-2 text-dark">
                                        <h6>Bookmarking</h6>
                                        <small>95%</small>
                                    </div>
                                    <ProgressBar variant="warning" className="mt-2" now={95} style={{height: "6px"}}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="card-title">Posts History</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className="text-center">
                            <Chart options={adminChart2.options} className="col-md-8 col-lg-8" series={adminChart2.series}   width="290" type="pie"/>
                                <p className="mb-0 mt-3">58% of friends that visit your profile comment on your posts.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
} 

export default Admin