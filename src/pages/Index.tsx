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
    priceDay: 4500,
    priceWeek: 27000,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    year: 2021,
    engine: '1.5 л, 160 л.с.',
    drive: 'Передний',
    features: ['Кондиционер', 'Камера заднего вида', 'Круиз-контроль', 'USB-зарядка', 'Подогрев сидений'],
  },
  {
    id: 2,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Чёрный',
    colorHex: '#1F2937',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/96af8d6a-8a13-460c-9b7a-a97c91604478.jpg',
    priceDay: 4500,
    priceWeek: 27000,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    year: 2022,
    engine: '1.5 л, 160 л.с.',
    drive: 'Передний',
    features: ['Кондиционер', 'Камера заднего вида', 'Bluetooth', 'USB-зарядка', 'Подогрев сидений'],
  },
  {
    id: 3,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Чёрный',
    colorHex: '#111827',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/29efa3fc-62b1-4a5a-8be0-9065de118f04.jpg',
    priceDay: 4500,
    priceWeek: 27000,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    year: 2020,
    engine: '1.5 л, 160 л.с.',
    drive: 'Передний',
    features: ['Кондиционер', 'Парктроник', 'Bluetooth', 'USB-зарядка'],
  },
  {
    id: 4,
    name: 'Malibu',
    brand: 'Chevrolet',
    color: 'Тёмное золото',
    colorHex: '#92702A',
    img: 'https://cdn.poehali.dev/projects/6de722bd-b919-42dd-9f2b-98ed7ca9fcf3/files/d1e1b5d7-a9ab-482a-9c7c-050c4e97fd2f.jpg',
    priceDay: 4500,
    priceWeek: 27000,
    priceMonth: 100000,
    type: 'Седан',
    seats: 5,
    transmission: 'Автомат',
    year: 2023,
    engine: '1.5 л, 160 л.с.',
    drive: 'Передний',
    features: ['Кондиционер', 'Камера заднего вида', 'Круиз-контроль', 'Bluetooth', 'USB-зарядка', 'Подогрев сидений'],
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




type Review = { name: string; car: string; text: string; rating: number };
type ChatMsg = { from: 'user' | 'admin'; text: string; time: string };
type User = { name: string; phone: string; email: string };

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

  // Личный кабинет
  const [user, setUser] = useState<User | null>(null);
  const [cabinetTab, setCabinetTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [regError, setRegError] = useState('');
  const [myBookings] = useState([
    { car: 'Malibu (Серый)', dates: '12–15 июня 2026', status: 'Активна', price: 10500 },
    { car: 'Malibu (Чёрный)', dates: '2–4 мая 2026', status: 'Завершена', price: 7000 },
  ]);

  // Модальное окно авто
  const [selectedCar, setSelectedCar] = useState<typeof CARS[0] | null>(null);

  // Рейтинги авто { carId: { sum, count } }
  const [carRatings, setCarRatings] = useState<Record<number, { sum: number; count: number }>>({});
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});

  const getAvgRating = (id: number) => {
    const r = carRatings[id];
    if (!r || r.count === 0) return null;
    return (r.sum / r.count).toFixed(1);
  };

  const ratecar = (carId: number, stars: number) => {
    const prev = userRatings[carId];
    setCarRatings((cr) => {
      const existing = cr[carId] || { sum: 0, count: 0 };
      const newSum = existing.sum - (prev || 0) + stars;
      const newCount = prev ? existing.count : existing.count + 1;
      return { ...cr, [carId]: { sum: newSum, count: newCount } };
    });
    setUserRatings((ur) => ({ ...ur, [carId]: stars }));
  };

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

  const handleRegister = () => {
    if (!regForm.name || !regForm.phone || !regForm.password) {
      setRegError('Заполните все обязательные поля');
      return;
    }
    setUser({ name: regForm.name, phone: regForm.phone, email: regForm.email });
    setRegError('');
  };

  const handleLogin = () => {
    if (!loginForm.phone || !loginForm.password) return;
    setUser({ name: 'Арендатор', phone: loginForm.phone, email: '' });
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
    const ra = getAvgRating(a.id) ? parseFloat(getAvgRating(a.id)!) : 0;
    const rb = getAvgRating(b.id) ? parseFloat(getAvgRating(b.id)!) : 0;
    return rb - ra;
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
        <div className="container relative py-20 md:py-24">
          {/* Top block */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                4 автомобиля доступно прямо сейчас
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
              {/* Скидка */}
              <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-accent/10 border border-accent/30">
                <Icon name="Tag" size={18} className="text-accent" />
                <span className="text-sm">
                  <b className="text-accent">Скидка при аренде на месяц</b> — всего <b className="text-foreground">3 500 ₽/сутки</b> вместо 4 500 ₽
                </span>
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full" />
              <img
                src={CARS[0].img}
                alt="Malibu"
                className="relative rounded-3xl w-full object-cover animate-float"
              />
            </div>
          </div>

          {/* Cars preview on hero */}
          <div>
            <p className="text-muted-foreground text-sm mb-4 font-medium">Нажмите на авто, чтобы узнать подробнее:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CARS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary transition-all duration-300 hover:scale-105 text-left"
                >
                  <img src={car.img} alt={car.name} className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: car.colorHex }} />
                      <span className="text-xs text-muted-foreground">{car.color}</span>
                    </div>
                    <div className="font-display font-bold text-sm">{car.brand} {car.name}</div>
                    <div className="text-primary text-xs font-semibold mt-1">{car.priceDay.toLocaleString()} ₽/сутки</div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                      Подробнее
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Car Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedCar(null)}>
          <Card className="w-full max-w-2xl bg-card border-border rounded-3xl overflow-hidden animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedCar.img} alt={selectedCar.name} className="w-full h-64 object-cover" />
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
              >
                <Icon name="X" size={18} />
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
                <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: selectedCar.colorHex }} />
                {selectedCar.color}
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{selectedCar.brand}</div>
              <h2 className="font-display text-3xl font-bold mt-1">{selectedCar.name} · {selectedCar.year} г.</h2>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  ['Users', `${selectedCar.seats} мест`],
                  ['Settings2', selectedCar.transmission],
                  ['Gauge', selectedCar.engine],
                  ['Navigation', selectedCar.drive],
                  ['Calendar', `${selectedCar.year} г.`],
                  ['Car', selectedCar.type],
                ].map(([ic, val]) => (
                  <div key={val} className="flex items-center gap-2 p-3 rounded-xl bg-secondary">
                    <Icon name={ic} size={14} className="text-primary shrink-0" />
                    <span className="text-xs font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-5">
                <div className="text-sm font-semibold mb-2">Комплектация:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{f}</span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-secondary text-center">
                  <div className="font-display text-xl font-bold text-primary">{selectedCar.priceDay.toLocaleString()} ₽</div>
                  <div className="text-xs text-muted-foreground mt-0.5">в сутки</div>
                </div>
                <div className="p-3 rounded-xl bg-secondary text-center">
                  <div className="font-display text-xl font-bold text-primary">{selectedCar.priceWeek.toLocaleString()} ₽</div>
                  <div className="text-xs text-muted-foreground mt-0.5">в неделю</div>
                </div>
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/30 text-center relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">Выгодно</div>
                  <div className="font-display text-xl font-bold text-accent">{selectedCar.priceMonth.toLocaleString()} ₽</div>
                  <div className="text-xs text-muted-foreground mt-0.5">в месяц (~{Math.round(selectedCar.priceMonth/30).toLocaleString()} ₽/сут)</div>
                </div>
              </div>

              <Button className="w-full h-12 rounded-xl font-semibold text-base mt-5" onClick={() => { setSelectedCar(null); scrollTo('booking'); }}>
                Забронировать этот автомобиль
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )}

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
                  {getAvgRating(car.id) ?? '—'}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand}</div>
                <h3 className="font-display text-2xl font-bold mt-1">{car.name}</h3>
                <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="Users" size={14} />{car.seats} мест</span>
                  <span className="flex items-center gap-1"><Icon name="Settings2" size={14} />{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {[1,2,3,4,5].map((s) => (
                    <button key={s} onClick={() => ratecar(car.id, s)} title="Оценить">
                      <Icon name="Star" size={16} className={s <= (userRatings[car.id] || 0) ? 'text-primary fill-primary' : 'text-muted-foreground'} />
                    </button>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {carRatings[car.id]?.count ? `${carRatings[car.id].count} оцен.` : 'Нет оценок'}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-4">
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
          <p className="text-muted-foreground mt-2">Управляйте бронированиями и историей аренд</p>

          {!user ? (
            <div className="mt-10 max-w-md mx-auto">
              {/* Tabs */}
              <div className="flex p-1 bg-secondary rounded-2xl mb-6">
                {(['login', 'register'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCabinetTab(tab)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      cabinetTab === tab ? 'bg-card text-foreground shadow' : 'text-muted-foreground'
                    }`}
                  >
                    {tab === 'login' ? 'Войти' : 'Регистрация'}
                  </button>
                ))}
              </div>

              {cabinetTab === 'login' ? (
                <Card className="p-8 bg-card border-border rounded-3xl">
                  <h3 className="font-display text-2xl font-bold mb-6">Вход в кабинет</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Телефон"
                      value={loginForm.phone}
                      onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    <Input
                      type="password"
                      placeholder="Пароль"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    <Button onClick={handleLogin} className="w-full h-12 rounded-xl font-semibold text-base">
                      Войти
                    </Button>
                    <button
                      onClick={() => setCabinetTab('register')}
                      className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Нет аккаунта? Зарегистрироваться
                    </button>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 bg-card border-border rounded-3xl">
                  <h3 className="font-display text-2xl font-bold mb-6">Создать аккаунт</h3>
                  <div className="space-y-4">
                    <Input
                      placeholder="Имя *"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    <Input
                      placeholder="Телефон *"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    <Input
                      placeholder="Email (необязательно)"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    <Input
                      type="password"
                      placeholder="Пароль *"
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      className="h-12 rounded-xl bg-secondary border-border"
                    />
                    {regError && <p className="text-destructive text-sm">{regError}</p>}
                    <Button onClick={handleRegister} className="w-full h-12 rounded-xl font-semibold text-base">
                      Зарегистрироваться
                    </Button>
                    <button
                      onClick={() => setCabinetTab('login')}
                      className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Уже есть аккаунт? Войти
                    </button>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <>
              {/* Profile header */}
              <div className="flex items-center justify-between mt-10 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary">{user.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.phone}</div>
                    {user.email && <div className="text-sm text-muted-foreground">{user.email}</div>}
                  </div>
                </div>
                <Button variant="outline" onClick={() => setUser(null)} className="rounded-full border-border">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </Button>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {[
                  ['Активные аренды', myBookings.filter(b => b.status === 'Активна').length.toString(), 'Car'],
                  ['Всего поездок', myBookings.length.toString(), 'Route'],
                  ['Потрачено', myBookings.reduce((s,b) => s + b.price, 0).toLocaleString() + ' ₽', 'CreditCard'],
                ].map(([l, v, ic]) => (
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

              {/* Bookings */}
              <Card className="bg-card border-border rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-border font-display text-xl font-bold">История бронирований</div>
                <div className="divide-y divide-border">
                  {myBookings.map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                          <Icon name="Car" size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{b.car}</div>
                          <div className="text-sm text-muted-foreground">{b.dates}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{b.price.toLocaleString()} ₽</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          b.status === 'Активна' ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted-foreground'
                        }`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
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
                <span className="text-sm">Поддержка с <b>10 утра до 9 вечера по московскому времени</b></span>
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

        </div>
      </footer>
    </div>
  );
};

export default Index;