export function GetLang(): any {
        // const item = cookies.get('sima_lang')
        const item = localStorage.getItem('blog_lang')
        return item  

}

export const isAuth = () => {
  if (process.browser) {
    if (localStorage.getItem("authToken")) {
      return localStorage.getItem("authToken");
    } else {
      return false;
    }
  }
};


