import React, { useEffect, useRef, useState } from "react";
import { Container, Breadcrumb, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEditKostMutation } from "../../../store/apis/kos";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import EditFoto from "../../../components/kos/editFoto";

const imgAllow = [
	"image/png",
	"image/jpg",
	"image/jpeg",
]

export default function Edit() {
  
  const facility = useSelector((state) => state.kos.fasilitas);
  const rule = useSelector(state => state.kos.peraturan)

  const formRef = useRef({})
	const [error, setError] = useState({})

  const [selectedKost, setSelectedKost] = useState()
	const [previewKost, setPreviewKost] = useState()

  const [
		editKostHit,
		{ isLoading, isSuccess, isError, data: dataEdit, error: errorEdit }
	] = useEditKostMutation()

  const editProfilSubmit = (e) => {
		e.preventDefault()

		setError({})
		let failed = false

		const kostName = formRef.current.kostName.value
    const description = formRef.current.description.value
    const kostTypeMan = formRef.current.kostTypeMan.value
    const kostTypeWoman = formRef.current.kostTypeWoman.value
    const kostTypeMixed = formRef.current.kostTypeMixed.value
    const frontBuildingPhoto = formRef.current.frontBuildingPhoto.value
    const frontFarbuildingPhoto = formRef.current.frontFarbuildingPhoto.value
    const yearSince = formRef.current.yearSince.value
    const province = formRef.current.province.value
    const city = formRef.current.city.value
    const address = formRef.current.address.value
    const gmaps = formRef.current.gmaps.value
    const restrictedNight = formRef.current.restrictedNight.value
    const identityCard = formRef.current.identityCard.value
    const restrictedGender = formRef.current.restrictedGender.value
    const restrictedGuest = formRef.current.restrictedGuest.value
    const maximumOne = formRef.current.maximumOne.value
    const maximumTwo = formRef.current.maximumTwo.value
    const restrictedCheckout = formRef.current.restrictedCheckout.value
    const restrictedCheckin = formRef.current.restrictedCheckin.value
    const includeElectricity = formRef.current.includeElectricity.value
    const noSmoking = formRef.current.noSmoking.value
    const enabled = formRef.current.enabled.value
    const kostTv = formRef.current.kostTv.value
    const electric = formRef.current.electric.value
    const laundry = formRef.current.laundry.value
    const refrigerator = formRef.current.refrigerator.value
    const water = formRef.current.water.value
    const wifi = formRef.current.wifi.value
    const dispenser = formRef.current.dispenser.value
    const drying_ground = formRef.current.drying_ground.value
    const kitchen = formRef.current.kitchen.value
    const livingRoom = formRef.current.livingRoom.value
    const parkingMotorcycle = formRef.current.arkingMotorcycle.value
    const parkingCar = formRef.current.parkingCar.value

	}

  const handleSebelumnya = (e) => {
    e.preventDefault();
    let newKey = 2;
    setKeynya(newKey);
  };

  const handleSetelahnya = (e) => {
    e.preventDefault();
    let newKey = 4;
    setKeynya(newKey);
  };
  return (
    <PenyewaLayout>
      <Container>
        <Breadcrumb className="mt-2">
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/", className: "text-decoration-none" }}
          >
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/kos", className: "text-decoration-none" }}
          >
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Kos</Breadcrumb.Item>
        </Breadcrumb>
        <Form className="border rounded px-3 px-lg-5">
          <div className="d-flex justify-content-between align-items-center mt-5">
            <h6 className="fw-bold">Edit Informasi Kos</h6>
            <Button variant="outline-primary" type="submit">
              Simpan
            </Button>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <img
                src="/logo512.png"
                className="rounded-circle border profile-picture"
                alt="..."
                width={120}
                height={120}
              />
            </div>
            <div className="mx-3">
              <p className="fw-bold">Informasi Pemilik Kos</p>
              <p className="p-0 m-0">
                <small>Agus mendoan</small>
              </p>
              <p className="p-0 m-0">
                <small>tennant@mail.com</small>
              </p>
              <p className="p-0 m-0">
                <small>0812121212</small>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Form.Group className="mb-4">
              <Form.Label>Nama Kos</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
               
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Tipe Kos</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <EditFoto />
            <Form.Group className="mb-4">
              <Form.Label>Tahun Kos dibangun</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Provinsi</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Kota</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Alamat</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Google Maps</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Peraturan Kos</Form.Label>
							{
								Object.keys(rule).map((el, i) => {
									return (
										<Form.Check className="w-100 mb-3" type="checkbox" label={el.text} key={i} />
									)
								})
							}
						</Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
              onSubmit={handleSetelahnya}
            >
              <Form.Label>Fasilitas</Form.Label>
              <br />
              {Object.keys(facility).map((el, i) => {
                return (
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label={el.text}
                    key={i}
                  />
                );
              })}
            </Form.Group>
          </div>
        </Form>
      </Container>
    </PenyewaLayout>
  );
}
