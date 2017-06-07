function handleAccountCreate(req, res) {
  const { email, password } = req.body;

  if (typeof email === "undefined" || typeof password === "undefined") {
    res.json({
      message: "Check parameters",
      status: false
    });
    return;
  }

  res.json({
    message: `email: ${email}, password: ${password}`,
    status: true
  });
}

export default handleAccountCreate;
