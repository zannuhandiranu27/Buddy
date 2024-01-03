
import DisclaimerArtikel from '../components/Artikel/DisclaimerArtikel';
import JumbotronArtikel from '../components/Artikel/JumbotronArtikel';
import ListArtikel from '../components/Artikel/ListArtikel';
import MainLayout from './../layout/MainLayout';

function Artikel() {
  return (
    <section className="Artikel" style={{
        backgroundColor: '#F4F7F9',
    }}>

    <MainLayout>
       <JumbotronArtikel/>
       <ListArtikel/>
       <DisclaimerArtikel/>
    </MainLayout>
    </section>
  )
}

export default Artikel