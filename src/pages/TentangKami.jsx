import TentangKamiComponent from "../components/TentangKami/TentangKami";
import MainLayout from "../layout/MainLayout";

function TentangKami() {
  return (
    <>
      <MainLayout>
        <section className="wrapper">
          <TentangKamiComponent />
        </section>
      </MainLayout>
    </>
  );
}

export default TentangKami;
