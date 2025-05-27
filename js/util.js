export function CalcDayDiffInDays(dateToCalc){
    const today = new Date();
    const date = new Date(dateToCalc);

    const timeDiff = today.getTime() - date.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysDiff;
}

export async function LoadHeader(id){
    const response = await fetch('../partials/header.html');
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

export async function LoadBanner(id){
    const response = await fetch('../partials/banner.html');
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

export function LogOut(){
    localStorage.clear();
    window.location.href = '../partials/header.html'
}
