

const NavLinks = [
    {
        label: "Dashboard",
        authRequired: false,
        href: "/dashboard"
    },
    {
        label: "Waitlist",
        authRequired: false,
        href: "/"
    },
    {
        label: "Orders",
        authRequired: false,
        href: "/orders"
    },
    {
        label: "Products",
        authRequired: false,
        href: "/products"
    },
    {
        label: "Settings",
        authRequired: false,
        href: "/settings"
    },
    {
        label: "Cart",
        authRequired: true,
        href: "/cart"
    },
]

export const NonUserLinks = [
    {
        label: "Signup",
        authRequired: false,
        href: "/signup"
    },
    {
        label: "Login",
        authRequired: false,
        href: "/login"
    }
]
export default NavLinks