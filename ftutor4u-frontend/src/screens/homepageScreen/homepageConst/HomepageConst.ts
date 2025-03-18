// filepath: c:\Users\Admin\Dev\Projects\React\Typescript\home-love\src\screens\homepageScreen\homepageConst\HomepageConst.ts
export interface ITutor {
    id: number;
    title: string;
    description: string;
    image: string;
    role: string;
    subject: string;
    price: string;
}

export const BestTutorsDataMock: ITutor[] = [
    {
        id: 1,
        title: "Trần Mai Lâm",
        description:
            "Tìm học viên FIN202 aim 9/10",
        image: "/images/wooden-plank-or-board.jpg",
        role: "tutor",
        subject: "FIN202",
        price: "200",
    },
    {
        id: 2,
        title: "Trần Minh Nhật",
        description:
            "Tìm học viên cần lấy gốc web (frontend, backend, hosting, DB)",
        image: "/images/wooden-plank-or-board.jpg",
        role: "tutor",
        subject: "WDP201",
        price: "300",
    },
    {
        id: 3,
        title: "Phạm Duy Khương",
        description:
            "Ai muốn aim 9 AIM cứ tìm đến mình nhé",
        image: "/images/wooden-plank-or-board.jpg",
        role: "tutor",
        subject: "AIM201",
        price: "150",
    },
];

export const BestRecommendTutorsDataMock: ITutor[] = [
    {
        id: 1,
        title: "Trần Minh Nhật",
        description:
            "Tìm học viên cần lấy gốc web (frontend, backend, hosting, DB)",
        image: "/images/wooden-plank-or-board.jpg",
        role: "tutor",
        subject: "WDP201",
        price: "300",
    },
];