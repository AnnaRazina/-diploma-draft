/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current) {
      Account.list(null, (err, response) => {
       if(response && response.success) {
        this.element.querySelectorAll('.accounts-select option').forEach(item => {
         item.remove();
         });
         response.data.forEach(elem => {
          this.element.querySelectorAll('.accounts-select').forEach(item => {
            item.insertAdjacentHTML('beforeend', `<option value="${elem.id}">${elem.name}</option>`);
          });
         })
       }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) =>{
      if(response && response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    });
  }
}
