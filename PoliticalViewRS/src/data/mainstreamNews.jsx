const mainstreamNews = [
  {
    name: "ABS-CBN News",
    sites_url: "https://news.abs-cbn.com",
    logo_url:
      "https://imgs.search.brave.com/FlyZqPSq1TNKRogaaYWp0s_8JwoTfCqhI_C9iA0bOCI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9kL2Q4L0FC/Uy1DQk5fJTI4MjAx/MyUyOS5zdmcvMjUw/cHgtQUJTLUNCTl8l/MjgyMDEzJTI5LnN2/Zy5wbmc",
  },
  {
    name: "GMA News Online",
    sites_url: "https://www.gmanetwork.com/news/eleksyon/2025/",
    logo_url:
      "https://imgs.search.brave.com/K3vwd_ETX4bO6iIUJ3Q2RAz0wBGPt1AeeFKNiqkeMFo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Yy9jMC9HTUFfTmV0/d29ya19Mb2dvX1Zl/Y3Rvci5zdmcvNTEy/cHgtR01BX05ldHdv/cmtfTG9nb19WZWN0/b3Iuc3ZnLnBuZw",
  },
  {
    name: "Inquirer.net",
    sites_url: "https://globalnation.inquirer.net/",
    logo_url:
      "https://www.inquirer.net/landing2017/images/inquirerdotnet_2016.svg",
  },
  {
    name: "Philstar.com",
    sites_url: "https://www.philstar.com/nation",
    logo_url:
      "https://imgs.search.brave.com/kuEA0BsC3ypLuHZ2fKyl6rKOdal5cOyWKUxk_U80SeU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2IzL1Ro/ZV9QaGlsaXBwaW5l/X1NUQVJfbG9nby5z/dmcvMjIwcHgtVGhl/X1BoaWxpcHBpbmVf/U1RBUl9sb2dvLnN2/Zy5wbmc",
  },
  {
    name: "Manila Bulletin",
    sites_url: "https://mb.com.ph/tag/matalinong-boto-2025",
    logo_url:
      "https://imgs.search.brave.com/8S6a9esXbCKK_s7KDxnIAEG-fDIVouYuLCzmqnPMc3c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzlkL01h/bmlsYS1CdWxsZXRp/bi5qcGcvMjUwcHgt/TWFuaWxhLUJ1bGxl/dGluLmpwZw",
  },
  {
    name: "The Manila Times",
    sites_url: "https://www.manilatimes.net",
    logo_url:
      "https://www.manilatimes.net//theme_manilatimes/images/manila-logo-header-web.png",
  },
  {
    name: "Daily Tribune",
    sites_url: "https://halalan.tribune.net.ph/",
    logo_url:
      "https://imgs.search.brave.com/giktXqZ656Rvr2-fL6Qxq8VD_DEoD6ZNEJcGN099ILQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E2L0Rh/aWx5X1RyaWJ1bmVf/bWFzdGhlYWQuc3Zn/LzI1MHB4LURhaWx5/X1RyaWJ1bmVfbWFz/dGhlYWQuc3ZnLnBu/Zw",
  },
  {
    name: "BusinessWorld",
    sites_url: "https://www.bworldonline.com/bilang-pilipino/",
    logo_url:
      "https://www.bworldonline.com/wp-content/uploads/2021/04/bw-logo-1.png",
  },
  {
    name: "CNN Philippines",
    sites_url: "https://www.cnnphilippines.com",
    logo_url:
      "https://imgs.search.brave.com/st9AwZogDRAHeFYrYO5yJk41xKmCIvsiCTL4ZmgddX0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2JlL1JQ/TjktQ05OX1BoaWxp/cHBpbmVzX05ld19s/b2dvLnBuZy8yNTBw/eC1SUE45LUNOTl9Q/aGlsaXBwaW5lc19O/ZXdfbG9nby5wbmc",
  },
  {
    name: "Rappler",
    sites_url: "https://www.rappler.com",
    logo_url:
      "https://imgs.search.brave.com/NoJMHGzSgNTcJ8clIFxEfbUiZHxez9W4o9Zcppl0Ylw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ni82OS9SYXBwbGVy/X2xvZ28uc3ZnLzUx/MnB4LVJhcHBsZXJf/bG9nby5zdmcucG5n",
  },
  {
    name: "Bulatlat",
    sites_url: "https://www.bulatlat.com/category/blog/politics/",
    logo_url:
      "https://imgs.search.brave.com/7kW8_cRaWUgAUrEb9f5gTJMH2_mSCyAAdhdLCJ1kr-E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnVsYXRsYXQuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzAxL2J1bGF0bGF0/LWxvZ28tdjMtMS5z/dmc",
  },
  {
    name: "VERA Files",
    sites_url: "https://verafiles.org/elections",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/VeraFiles_logo.svg/250px-VeraFiles_logo.svg.png",
  },
  {
    name: "News5",
    sites_url: "https://www.news5.com.ph",
    logo_url:
      "https://imgs.search.brave.com/sDCvT3cS8rJ35qMkQm_j0tV2OkPfq2JQdBmH8UeN6pA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi84Lzg5L05F/V1M1LnN2Zy8yNTBw/eC1ORVdTNS5zdmcu/cG5n",
  },
  {
    name: "Philippine News Agency",
    sites_url: "https://www.pna.gov.ph/categories/national",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Philippine_News_Agency_Logo.svg",
  },
  {
    name: "Manila Standard",
    sites_url: "https://manilastandard.net/category/news/elections-2025",
    logo_url:
      "https://imgs.search.brave.com/IJtKNAYZ0ep1bNLXZ30wwcKCakC8lX2VjFHEMld0uv0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi82LzZmL01h/bmlsYV9TdGFuZGFy/ZF9tYXN0aGVhZC5z/dmcvMjIwcHgtTWFu/aWxhX1N0YW5kYXJk/X21hc3RoZWFkLnN2/Zy5wbmc",
  },
  {
    name: "Interaksyon",
    sites_url: "https://interaksyon.philstar.com/politics-issues/",
    logo_url:
      "https://media.interaksyon.com/wp-content/uploads/2020/03/interaksyon-logo.png",
  },
];

export default mainstreamNews;
