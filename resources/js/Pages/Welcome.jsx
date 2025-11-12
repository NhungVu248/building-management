import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="SmartBuilding - Quản lý Tòa Nhà Thông Minh" />

            {/* --- HERO --- */}
            <section
                className="relative bg-cover bg-center h-[90vh] flex flex-col justify-center text-white"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
                <div className="relative z-10 px-10 md:px-20 max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        SmartBuilding – Quản lý Tòa Nhà Thông Minh
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                        Giải pháp toàn diện cho việc quản lý, vận hành và kết
                        nối cư dân – giúp bạn điều hành tòa nhà hiệu quả, minh
                        bạch và hiện đại hơn.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href={
                                auth.user ? route("dashboard") : route("login")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                        >
                            Truy cập hệ thống
                        </Link>
                        {!auth.user && (
                            <Link
                                href={route("register")}
                                className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
                            >
                                Đăng ký ngay
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* --- THỐNG KÊ --- */}
            <section className="bg-white py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-12">
                    Thống kê hệ thống
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Tòa nhà đang quản lý", value: "300+" },
                        { label: "Cư dân đang sử dụng", value: "50,000+" },
                        { label: "Nhân sự vận hành", value: "2,000+" },
                        { label: "Đối tác công nghệ", value: "20+" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition py-8"
                        >
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">
                                {item.value}
                            </h3>
                            <p className="text-gray-600">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- TÍNH NĂNG NỔI BẬT --- */}
            <section className="bg-gray-50 py-20 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-12">
                    Giải pháp quản lý toàn diện
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        {
                            icon: "🏢",
                            title: "Quản lý tòa nhà & cư dân",
                            desc: "Theo dõi tình trạng căn hộ, hồ sơ cư dân, hợp đồng, và phản ánh trong cùng một nền tảng.",
                        },
                        {
                            icon: "💰",
                            title: "Quản lý tài chính minh bạch",
                            desc: "Tự động hóa hóa đơn, thanh toán, báo cáo thu chi và nhắc nợ chính xác.",
                        },
                        {
                            icon: "🛠️",
                            title: "Vận hành & bảo trì thiết bị",
                            desc: "Theo dõi bảo trì định kỳ, xử lý yêu cầu bảo dưỡng và quản lý lịch làm việc.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-3xl p-10 hover:shadow-lg transition"
                        >
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-700">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ĐỐI TÁC --- */}
            <section className="bg-white py-20 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-12">
                    Đối tác công nghệ
                </h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-80">
                    {[
                        "VNBUILD",
                        "EVNTECH",
                        "SMARTCITY",
                        "CLOUDHOME",
                        "BUILDING360",
                    ].map((p, i) => (
                        <div
                            key={i}
                            className="px-10 py-4 bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition text-gray-600 font-semibold"
                        >
                            {p}
                        </div>
                    ))}
                </div>
            </section>

            {/* --- GIỚI THIỆU --- */}
            <section className="bg-gray-50 py-20 px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80"
                        alt="Modern Building"
                        className="rounded-3xl shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-blue-700 mb-4">
                        Về SmartBuilding
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        SmartBuilding là nền tảng phần mềm quản lý tòa nhà thông
                        minh, được phát triển nhằm hỗ trợ Ban quản lý tối ưu hóa
                        vận hành, tự động hóa công việc và cung cấp trải nghiệm
                        tốt nhất cho cư dân.
                        <br /> Hệ thống có thể tùy chỉnh cho mọi loại hình tòa
                        nhà – từ căn hộ, khu phức hợp đến trung tâm thương mại.
                    </p>
                    <div className="flex gap-10 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600">
                                500+
                            </h3>
                            <p className="text-gray-600">Tòa nhà triển khai</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600">
                                9.8/10
                            </h3>
                            <p className="text-gray-600">Hài lòng khách hàng</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-blue-600">
                                6
                            </h3>
                            <p className="text-gray-600">Năm phát triển</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LIÊN HỆ --- */}
            <footer className="bg-blue-700 text-white text-center py-16 px-6">
                <h3 className="text-3xl font-semibold mb-8">
                    Liên hệ với SmartBuilding
                </h3>
                <div className="flex flex-wrap justify-center gap-12 text-sm">
                    <div>
                        <p className="font-semibold">📧 Email</p>
                        <p>support@smartbuilding.vn</p>
                    </div>
                    <div>
                        <p className="font-semibold">📞 Điện thoại</p>
                        <p>(028) 1234-5678</p>
                    </div>
                    <div>
                        <p className="font-semibold">📍 Địa chỉ</p>
                        <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                    </div>
                </div>
                <p className="text-xs text-blue-100 mt-10">
                    Laravel v{laravelVersion} (PHP v{phpVersion}) •
                    SmartBuilding © {new Date().getFullYear()}
                </p>
            </footer>
        </>
    );
}
