import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const CARS = [
  {
    id: 1,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Серый',
    colorHex: '#9CA3AF',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/0c1ff4e5-8bd3-4c00-bd09-2509109a13bc.jpg',
    priceDay: 3500,
    priceWeek: 24500,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Чёрный',
    colorHex: '#1F2937',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/96af8d6a-8a13-460c-9b7a-a97c91604478.jpg',
    priceDay: 3500,
    priceWeek: 24500,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Чёрный',
    colorHex: '#111827',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/29efa3fc-62b1-4a5a-8be0-9065de118f04.jpg',
    priceDay: 3500,
    priceWeek: 24500,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Тёмное золото',
    colorHex: '#92702A',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/d1e1b5d7-a9ab-482a-9c7c-050c4e97fd2f.jpg',
    priceDay: 3500,
    priceWeek: 24500,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    rating: 4.9,
  },
];

const TYPES = ['Все', 'Седан'];
const SORTS = [
  { key: 'price-asc', label: 'Сначала дешевле' },
  { key: 'price-desc', label: 'Сначала дороже' },
  { key: 'rating', label: 'По рейтингу' },
];

const TARIFF_TABS = [
  { key: 'day', label: 'Сутки', field: 'priceDay' },
  { key: 'week', label: 'Неделя', field: 'priceWeek' },
  { key: 'month', label: 'Месяц', field: 'priceMonth' },
] as const;

const REVIEWS = [
  { name: 'Алексей М.', car: 'Sport GT', text: 'Машина — огонь! Брал на выходные, всё чисто, заправлено. Поддержка ответила мгновенно.', rating: 5 },
  { name: 'Марина К.', car: 'Urban X', text: 'Идеально для города и семьи. Оформление заняло 5 минут, без бумажной волокиты.', rating: 5 },
  { name: 'Дмитрий В.', car: 'Business S', text: 'Брал на деловую поездку — выглядит солидно, едет мягко. Однозначно вернусь.', rating: 5 },
];

const BOOKINGS = [
  { car: 'Urban X', dates: '12–15 июня', status: 'Активна', price: 10200 },
  { car: 'Sport GT', dates: '2–4 мая', status: 'Завершена', price: 11800 },
];

const Index = () => {
  const [type, setType] = useState('Все');
  const [sort, setSort] = useState('price-asc');
  const [tariff, setTariff] = useState<'day' | 'week' | 'month'>('day');

  const getPriceByTariff = (car: typeof CARS[0]) => {
    if (tariff === 'week') return car.priceWeek;
    if (tariff === 'month') return car.priceMonth;
    return car.priceDay;
  };

  const tariffLabel = tariff === 'week' ? 'неделю' : tariff === 'month' ? 'месяц' : 'сутки';

  const filtered = CARS.filter((c) => type === 'Все' || c.type === type).sort((a, b) => {
    if (sort === 'price-asc') return getPriceByTariff(a) - getPriceByTariff(b);
    if (sort === 'price-desc') return getPriceByTariff(b) - getPriceByTariff(a);
    return b.rating - a.rating;
  });

  const nav = [
    ['Каталог', 'catalog'],
    ['Отзывы', 'reviews'],
    ['Кабинет', 'cabinet'],
    ['Поддержка', 'support'],
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <Icon name="Car" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">DRIVE</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('catalog')} className="rounded-full font-semibold">
            Арендовать
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 grid-bg">
        <div className="container relative py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Более 120 авто доступно прямо сейчас
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] uppercase">
                Аренда авто <br />
                <span className="text-gradient">без границ</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Выбирай машину мечты, бронируй за пару минут и отправляйся в путь. Полная поддержка 24/7.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollTo('catalog')} className="rounded-full font-semibold text-base h-12 px-8">
                  Смотреть каталог
                  <Icon name="ArrowRight" size={18} className="ml-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo('support')} className="rounded-full font-semibold text-base h-12 px-8 border-border">
                  <Icon name="Phone" size={18} className="mr-1" />
                  Связаться
                </Button>
              </div>
              <div className="mt-12 flex gap-8">
                {[['120+', 'автомобилей'], ['24/7', 'поддержка'], ['4.9', 'рейтинг']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-3xl font-bold text-primary">{n}</div>
                    <div className="text-sm text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full" />
              <img
                src={CARS[0].img}
                alt="Sport GT"
                className="relative rounded-3xl w-full object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border py-4 bg-secondary/50 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['Без залога', 'Доставка авто', 'Полная страховка', 'Поддержка 24/7', 'Чистый салон', 'Полный бак'].map((t) => (
                <span key={t} className="flex items-center font-display text-2xl uppercase font-semibold px-8 text-muted-foreground">
                  {t}
                  <Icon name="Sparkles" size={18} className="ml-8 text-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <section id="catalog" className="container py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Каталог авто</h2>
            <p className="text-muted-foreground mt-2">Выбери идеальный вариант для своей поездки</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  type === t
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Icon name="ArrowDownUp" size={16} className="text-muted-foreground" />
            {SORTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={`text-sm font-medium transition-colors ${
                  sort === s.key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary border border-border">
            {TARIFF_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTariff(t.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  tariff === t.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <Card key={car.id} className="group overflow-hidden bg-card border-border rounded-3xl hover-scale">
              <div className="relative overflow-hidden">
                <img src={car.img} alt={car.name} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
                  <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: car.colorHex }} />
                  {car.color}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
                  <Icon name="Star" size={12} className="text-primary fill-primary" />
                  {car.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand}</div>
                <h3 className="font-display text-2xl font-bold mt-1">{car.name}</h3>
                <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="Users" size={14} />{car.seats} мест</span>
                  <span className="flex items-center gap-1"><Icon name="Settings2" size={14} />{car.transmission}</span>
                </div>
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="font-display text-3xl font-bold text-primary">{getPriceByTariff(car).toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm"> ₽/{tariffLabel}</span>
                  </div>
                  <Button className="rounded-full font-semibold">Забронировать</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="bg-secondary/40 border-y border-border py-20 md:py-28">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Быстрое бронирование</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Заполни короткую форму, и наш менеджер подтвердит аренду в течение 15 минут.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ['MousePointerClick', 'Выбери авто из каталога'],
                ['CalendarCheck', 'Укажи даты аренды'],
                ['CreditCard', 'Подтверди и оплати онлайн'],
                ['KeyRound', 'Забери ключи или закажи доставку'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon name={icon} size={18} className="text-primary" />
                  </div>
                  <span className="text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8 bg-card border-border rounded-3xl">
            <h3 className="font-display text-2xl font-bold mb-6">Оформить аренду</h3>
            <div className="space-y-4">
              <Input placeholder="Ваше имя" className="h-12 rounded-xl bg-secondary border-border" />
              <Input placeholder="Телефон" className="h-12 rounded-xl bg-secondary border-border" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" className="h-12 rounded-xl bg-secondary border-border" />
                <Input type="date" className="h-12 rounded-xl bg-secondary border-border" />
              </div>
              <select className="w-full h-12 rounded-xl bg-secondary border border-border px-3 text-sm">
                {CARS.map((c) => <option key={c.id}>{c.name} — {c.price.toLocaleString()} ₽/сутки</option>)}
              </select>
              <Button className="w-full h-12 rounded-xl font-semibold text-base">Отправить заявку</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-center">Отзывы арендаторов</h2>
        <p className="text-muted-foreground mt-2 text-center">Что говорят те, кто уже с нами проехал</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {REVIEWS.map((r) => (
            <Card key={r.name} className="p-7 bg-card border-border rounded-3xl">
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed">«{r.text}»</p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">арендовал {r.car}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Cabinet */}
      <section id="cabinet" className="bg-secondary/40 border-y border-border py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Личный кабинет</h2>
          <p className="text-muted-foreground mt-2">Ваши бронирования и история аренд</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[['Активные', '1', 'Car'], ['Всего поездок', '7', 'Route'], ['Бонусы', '2 400 ₽', 'Gift']].map(([l, v, ic]) => (
              <Card key={l} className="p-6 bg-card border-border rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Icon name={ic} size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">{v}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-6 bg-card border-border rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border font-display text-xl font-bold">История бронирований</div>
            <div className="divide-y divide-border">
              {BOOKINGS.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <Icon name="Car" size={20} className="text-primary" />
                    <div>
                      <div className="font-semibold">{b.car}</div>
                      <div className="text-sm text-muted-foreground">{b.dates}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-semibold">{b.price.toLocaleString()} ₽</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      b.status === 'Активна' ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted-foreground'
                    }`}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Тех. поддержка</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Возникли вопросы? Мы на связи круглосуточно. Звоните администратору или напишите нам.
            </p>
            <div className="mt-8 space-y-4">
              <a href="tel:+79875139029" className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary">
                  <Icon name="Phone" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Администратор</div>
                  <div className="font-display text-xl font-bold">+7 (987) 513-90-29</div>
                </div>
              </a>
              <div className="grid grid-cols-2 gap-4">
                {[['MessageCircle', 'Telegram'], ['Mail', 'Почта']].map(([ic, l]) => (
                  <div key={l} className="flex items-center gap-3 p-5 rounded-2xl bg-card border border-border">
                    <Icon name={ic} size={20} className="text-primary" />
                    <span className="font-semibold">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-accent/10 border border-accent/30">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="text-sm">Среднее время ответа — <b>под 2 минуты</b></span>
              </div>
            </div>
          </div>
          <Card className="p-8 bg-card border-border rounded-3xl">
            <h3 className="font-display text-2xl font-bold mb-6">Написать в поддержку</h3>
            <div className="space-y-4">
              <Input placeholder="Ваше имя" className="h-12 rounded-xl bg-secondary border-border" />
              <Input placeholder="Телефон или email" className="h-12 rounded-xl bg-secondary border-border" />
              <Textarea placeholder="Опишите ваш вопрос..." rows={4} className="rounded-xl bg-secondary border-border" />
              <Button className="w-full h-12 rounded-xl font-semibold text-base">Отправить сообщение</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Car" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">DRIVE</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 DRIVE — современная аренда автомобилей</p>
          <div className="flex gap-4">
            {['Instagram', 'Send', 'Youtube'].map((ic) => (
              <div key={ic} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Icon name={ic} size={18} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;