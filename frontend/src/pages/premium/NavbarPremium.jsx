import { Box, Button, Divider, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../pages/premium/PremiumStyles.css";
import fitnesLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarPremium = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const url = `https://smooth-flavor-1645.herokuapp.com/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user.given_name);

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/logout`, "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box className="PremiumNavbar">
      <Box className="navBarTop">
        <Image src={fitnesLogo} onClick={() => navigate("/")} />
        {!user.given_name ? (
          <Box className="loginSignupButtons">
            <Button
              variant="ghost"
              color="#0066EE"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Divider orientation="vertical" />
            <Button
              variant="ghost"
              color="#0066EE"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box className="loginSignupButtons">
            <Button
              variant="ghost"
              color="#0066EE"
            >
              {user.given_name}
            </Button>
            <Divider orientation="vertical" />
            <Button variant="ghost" color="#0066EE" onClick={logout}>
              Log out
            </Button>
          </Box>
        )}
      </Box>
      <Box className="navBarBottom">
        <Box onClick={() => navigate("/")}>ABOUT</Box>
        <Box>FOOD</Box>
        <Box>EXERCISE</Box>
        <Box>APPS</Box>
        <Box>COMMUNITY</Box>
        <Box>BLOG</Box>
        <Box onClick={() => navigate("/premium")}>PREMIUM</Box>
      </Box>
    </Box>
  );
};

export default NavbarPremium;
