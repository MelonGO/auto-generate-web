
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                {children}
            </div>
        </div>
    );
}