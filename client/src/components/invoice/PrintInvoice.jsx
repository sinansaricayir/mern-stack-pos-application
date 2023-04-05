import { Modal, Button } from "antd";

const PrintInvoice = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black">
        <div className="bg-white px-6 max-w-5xl mx-auto">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="invoice-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md">
                  <p className="font-bold">Fatura Detayı</p>
                  <p>Unwrapped</p>
                  <p>Fake Street 123</p>
                  <p>San Javier</p>
                  <p>CA 1234</p>
                </div>
                <div className="text-md">
                  <p className="font-bold">Fatura</p>
                  <p>The Boring Company</p>
                  <p>Tesla Street 007</p>
                  <p>Frisco</p>
                  <p>CA 0000</p>
                </div>
                <div className="text-md">
                  <p className="font-bold">Fatura Numarası</p>
                  <p>00027</p>
                  <p className="font-bold mt-2">Veriliş tarihi</p>
                  <p>2022-11-21</p>
                </div>
                <div className="text-md sm:block hidden">
                  <p className="font-bold">Şartlar</p>
                  <p>10 Gün</p>
                  <p className="font-bold mt-2">Vade</p>
                  <p>12.03.2023</p>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="sm:w-auto w-full py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end  text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-600">
                    <td className="py-4 sm:table-cell hidden">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        className="w-12 h-12 object-cover "
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">Şalgam</span>
                        <span className="sm:hidden inline-block text-xs">
                          Birim Fiyatı 12₺
                        </span>
                      </div>
                    </td>
                    <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                      <span>12.00₺</span>
                    </td>
                    <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                      <span>1</span>
                    </td>
                    <td className="py-4 text-end">
                      <span>12.00₺</span>
                    </td>
                  </tr>
                  <tr className="border-t border-b border-slate-200">
                    <td className="py-4 sm:table-cell hidden">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        className="w-12 h-12 object-cover "
                      />
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">Şalgam</span>
                        <span className="sm:hidden inline-block text-xs">
                          Birim Fiyatı 12₺
                        </span>
                      </div>
                    </td>
                    <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                      <span>12.00₺</span>
                    </td>
                    <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                      <span>1</span>
                    </td>
                    <td className="py-4 text-end">
                      <span>12.00₺</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right sm:table-cell hidden pt-4"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-left sm:hidden py-2" scope="row">
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right">
                      <span className="font-normal text-slate-700">61.00₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th className="text-left sm:hidden" scope="row">
                      <p className="font-normal text-slate-700">KDV</p>
                    </th>
                    <th className="text-right">
                      <span className="font-normal text-red-400">+.15.00</span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-bold text-slate-700">
                        Genel Toplam
                      </span>
                    </th>
                    <th className="text-left sm:hidden" scope="row">
                      <p className="font-bold text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right">
                      <span className="font-normal text-slate-700">61.00₺</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="py-6">
              <div className="border-t pt-9 border-slate-200">
                <p className="text-sm font-light text-slate-700">
                  Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                  Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                  sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                  talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                  ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                  Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                  geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                  England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                  Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large">
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintInvoice;