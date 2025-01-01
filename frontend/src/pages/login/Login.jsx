import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import NavbarPremium from "../premium/NavbarPremium";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", loginCreds.email);
      formData.append("password", loginCreds.password);

      const response = await axios.post(
        "https://howard-stage.devdesignbuild.com/api/auth/login",
        formData
      );

      if (response.data.status) {
        const token = response.data.token.access_token;

        // Save token in localStorage
        localStorage.setItem("authToken", token);

        // Success toast
        toast.success("Login successful! Redirecting to home...");

        // Navigate to the home page
        navigate("/myHome");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const googleAuth = () => {
    window.open(
      `https://myfitnesspalclone17.herokuapp.com/google/callback`,
      "_self"
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/myHome");
    }
  }, [navigate]);

  return (
    <>
      <NavbarPremium />
      <Box className="signupWrapper">
        <Box className="insideBox" h="fit-content" p="20px">
          <form onSubmit={handleLoginSubmit}>
            <Box>
              <Heading fontSize="20px" my="10px">
                Member Login
              </Heading>
              <Input
                placeholder="Email Address"
                h="50px"
                my="20px"
                value={loginCreds.email}
                onChange={handleLoginChange}
                type="email"
                name="email"
                required
              />
              <Input
                placeholder="Password"
                h="50px"
                value={loginCreds.password}
                onChange={handleLoginChange}
                type="password"
                name="password"
                required
              />
              <Text
                color="blue"
                mb="10px"
                as="u"
                align="left"
                mt="5px"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Text>
            </Box>

            <Box mt="40px">
              <Button
                bg="#0066EE"
                color="white"
                w="350px"
                fontSize="18px"
                mt="10px"
                type="submit"
              >
                LOG IN
              </Button>
              <Text color="#A0A0A0" mb="10px" align="center">
                or
              </Text>
              <Button
                leftIcon={<FcGoogle />}
                colorScheme="blue"
                variant="outline"
                w="350px"
                mb="20px"
                onClick={googleAuth}
              >
                CONTINUE WITH GOOGLE
              </Button>
            </Box>
          </form>
        </Box>

        <Text color="#A0A0A0" my="10px" align="center" fontSize="sm">
          Not a member?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up now
          </span>
        </Text>
      </Box>

      {/* Toast Notifications Container */}
      <Toaster/>
    </>
  );
};

export default Login;
