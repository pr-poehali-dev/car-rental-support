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



const BOOKINGS = [
  { car: 'Urban X', dates: '12–15 июня', status: 'Активна', price: 10200 },
  { car: 'Sport GT', dates: '2–4 мая', status: 'Завершена', price: 11800 },
];

type Review = { name: string; car: string; text: string; rating: number };
type ChatMsg = { from: 'user' | 'admin'; text: string; time: string };

const Index = () => {
  const [type, setType] = useState('Все');
  const [sort, setSort] = useState('price-asc');
  const [tariff, setTariff] = useState<'day' | 'week' | 'month'>('day');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: '', car: 'Malibu (Серый)', text: '', rating: 5 });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { from: 'admin', text: 'Здравствуйте! Чем могу помочь?', time: '10:00' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setChatMessages((prev) => [...prev, { from: 'user', text: chatInput.trim(), time }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { from: 'admin', text: 'Спасибо за обращение! Администратор ответит вам в ближайшее время (поддержка работает с 10:00 до 21:00 по МСК).', time },
      ]);
    }, 1000);
  };

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
            <span className="font-display text-2xl font-bold tracking-tight">Drive_Car58rus</span>
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
                Выбирай машину мечты, бронируй за пару минут и отправляйся в путь. Поддержка с 10:00 до 21:00 по МСК.
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
                {[['120+', 'автомобилей'], ['10–21', 'поддержка МСК'], ['4.9', 'рейтинг']].map(([n, l]) => (
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
              {['Без залога', 'Доставка авто', 'Полная страховка', 'Режим работы 10:00–21:00', 'Чистый салон', 'Полный бак'].map((t) => (
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
                {CARS.map((c) => <option key={c.id}>{c.name} ({c.color}) — {c.priceDay.toLocaleString()} ₽/сутки</option>)}
              </select>
              <Button className="w-full h-12 rounded-xl font-semibold text-base">Отправить заявку</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-20 md:py-28">
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase text-center">Отзывы арендаторов</h2>
        <p className="text-muted-foreground mt-2 text-center">Поделитесь своим опытом аренды</p>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Form */}
          <Card className="p-8 bg-card border-border rounded-3xl">
            <h3 className="font-display text-2xl font-bold mb-6">Оставить отзыв</h3>
            <div className="space-y-4">
              <Input
                placeholder="Ваше имя"
                value={reviewForm.name}
                onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                className="h-12 rounded-xl bg-secondary border-border"
              />
              <select
                value={reviewForm.car}
                onChange={(e) => setReviewForm({ ...reviewForm, car: e.target.value })}
                className="w-full h-12 rounded-xl bg-secondary border border-border px-3 text-sm text-foreground"
              >
                {CARS.map((c) => (
                  <option key={c.id} value={`${c.name} (${c.color})`}>{c.name} — {c.color}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Оценка:</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setReviewForm({ ...reviewForm, rating: s })}>
                    <Icon
                      name="Star"
                      size={22}
                      className={s <= reviewForm.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Расскажите о своём опыте аренды..."
                rows={4}
                value={reviewForm.text}
                onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                className="rounded-xl bg-secondary border-border"
              />
              <Button
                className="w-full h-12 rounded-xl font-semibold text-base"
                onClick={() => {
                  if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;
                  setReviews([{ ...reviewForm }, ...reviews]);
                  setReviewForm({ name: '', car: 'Malibu (Серый)', text: '', rating: 5 });
                }}
              >
                Отправить отзыв
              </Button>
            </div>
          </Card>

          {/* Comments list */}
          <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-1">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[240px] rounded-3xl border border-dashed border-border text-center p-8">
                <Icon name="MessageSquare" size={40} className="text-muted-foreground mb-4" />
                <p className="font-display text-xl font-bold">Пока нет отзывов</p>
                <p className="text-muted-foreground text-sm mt-2">Будьте первым — поделитесь впечатлением!</p>
              </div>
            ) : (
              reviews.map((r, i) => (
                <Card key={i} className="p-6 bg-card border-border rounded-2xl">
                  <div className="flex gap-1 mb-3">
                    {[...Array(r.rating)].map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">«{r.text}»</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">арендовал {r.car}</div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
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
              Поддержка работает с <b className="text-foreground">10:00 до 21:00 по МСК</b>. Вы можете обратиться как по телефону, так и в чат с администратором.
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
              <button
                onClick={() => setChatOpen(true)}
                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon name="MessageSquare" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Онлайн-чат</div>
                  <div className="font-display text-xl font-bold">Написать администратору</div>
                </div>
              </button>
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-primary/10 border border-primary/30">
                <Icon name="Clock" size={20} className="text-primary" />
                <span className="text-sm">Поддержка с <b>10:00 утра по МСК</b> до <b>9 вечера по МСК</b></span>
              </div>
            </div>
          </div>
          <Card className="p-8 bg-card border-border rounded-3xl">
            <h3 className="font-display text-2xl font-bold mb-2">Чат с администратором</h3>
            <p className="text-sm text-muted-foreground mb-6">Режим работы: 10:00–21:00 по МСК</p>
            <div className="flex flex-col gap-3 h-64 overflow-y-auto mb-4 pr-1">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.from === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm'
                  }`}>
                    <p>{m.text}</p>
                    <p className={`text-xs mt-1 ${m.from === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Напишите сообщение..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="h-11 rounded-xl bg-secondary border-border"
              />
              <Button onClick={sendMessage} className="h-11 w-11 rounded-xl p-0 shrink-0">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <Card className="w-80 bg-card border-border rounded-3xl shadow-2xl overflow-hidden animate-fade-up">
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Администратор</div>
                  <div className="text-xs text-muted-foreground">10:00–21:00 МСК</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-3 h-56 overflow-y-auto p-4">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                    m.from === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm'
                  }`}>
                    <p>{m.text}</p>
                    <p className={`text-xs mt-0.5 ${m.from === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 border-t border-border">
              <Input
                placeholder="Сообщение..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="h-9 rounded-xl bg-secondary border-border text-sm"
              />
              <Button onClick={sendMessage} className="h-9 w-9 rounded-xl p-0 shrink-0">
                <Icon name="Send" size={14} />
              </Button>
            </div>
          </Card>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg glow-primary hover:scale-110 transition-transform"
        >
          <Icon name={chatOpen ? 'X' : 'MessageSquare'} size={24} className="text-primary-foreground" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Car" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">Drive_Car58rus</span>
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