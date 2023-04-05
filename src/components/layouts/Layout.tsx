import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { Router } from "next/router";

type LayoutProps = {
  children: React.ReactElement | string;
  router: Router;
};

const Layout = ({ children, router }: LayoutProps) => {
  return (
    <Box as="main" pb={8} height='100dvh' display='flex'>
      <Head>
        <title>sleepytime</title>
        <meta name="description" content="calculated sleepytime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kitty.png" />
      </Head>
      <Navbar path={router.asPath} />
      <Container maxW="container.md" pt={14} flexGrow={1}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
