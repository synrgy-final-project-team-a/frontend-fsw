import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BasicExample() {
  return (
    <dev>
        <h1>Lupa Password</h1>
        <h2>Masukin email yang anda gunakan pada saat mendaftar dan kami akan mengirimkan link untuk mengubah password anda ke email</h2>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Alamat Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>
            <Button variant="primary" type="submit">
                Kirim Link Verifikasi
            </Button>
        </Form>
        <p>Belum punya akun? Daftar yuk!</p>
        <a href='#'>Lupa Password</a>
    </dev>
  );
}

export default BasicExample;