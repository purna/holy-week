// ============================================================
// CHARACTER: Market Informant / Bribe-Taker
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE_EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'informant' (Market informer)
// BIBLE REFERENCE: Matthew 26:14-16; Zechariah 11:12
// ------------------------------------------------------------

-> start

=== start ===
Information has a price. Names have a price. Silence also
has a price. The Galilean's gathering had a ledger before
the sun went down. One of the twelve.

* [You are selling information?] -> selling
* [Tell me about the Galilean.] -> galilean
* [Who pays you?] -> who_pays

=== selling ===
I sell what people are willing to pay for. The Sanhedrin
pays for surveillance data. The Zealots pay for safe house
locations. You pay for this conversation. Price is relative,
scribe — what are you willing to part with?

* [What does the Sanhedrin want?] -> sanhedrin_pay
* [The Zealots seem dangerous clients.] -> zealot_clients
* [I have coin.] -> coin_offer

=== galilean ===
The Galilean draws crowds like a fire draws moths. The
priests want to know who, where, when — not why.
Understanding is not their métier. Control is. They
cannot stop the movement. So they try to predict it.

* [They fear losing control.] -> fear_control
* [Prediction is not control.] -> prediction_not_control
* [The crowd is fickle.] -> fickle_crowd

=== who_pays ===
The Sanhedrin pays in Tyrian shekels — gold-standard
silver that no Roman mint has ever debased. The Zealots
pay in copper and promises. The wealthy families pay
in land deeds and daughters' dowries. I take what I
can carry.

* [The Sanhedrin's silver.] -> sanhedrin_pay
* [What about the priests' inner circle?] -> inner_circle
* [You move between factions.] -> factions

=== sanhedrin_pay ===
One of the twelve disciples. The one who keeps the
purse. He has... concerns. Concerns that translate
well into the seventy pieces of silver the inner
council values at precisely the price of a slave's
life. The information I provided has already been
used to tighten the net around the Teacher.

* [Judas Iscariot.] -> judas_name
* [You facilitated the betrayal.] -> facilitated_betrayal
* [The price of a slave.] -> slave_price

=== zealot_clients ===
The Zealots want safe houses and escape routes. They
believe the Teacher will lead an armed revolt. They
want to be positioned when it happens. I tell them
what they want to hear. They pay regardless of truth.

* [Lying to revolutionaries.] -> lying_to_revolutionaries
* [Their beliefs shape their payments.] -> beliefs_pay
* [Both factions manipulate you.] -> both_manipulate

=== coin_offer ===
Coin, you say. Tell me what intelligence you seek,
and I will name my price. The Sanhedrin pays well.
The Zealots pay generously. The Romans... they
pay in favors, which are harder to spend.

* [What intelligence is most valuable?] -> valuable_intel
* [I prefer coin to favors.] -> coin_preference
* [Your services are expensive.] -> expensive_services

=== inner_circle ===
The High Priest's inner circle meets in the Temple
storage chambers. They have scrolls with names —
disciples, followers, sympathizers. They cross-reference
with tax records. They track movement through
the gates. They pay well for accuracy.

* [The surveillance network.] -> surveillance_network
* [Names on scrolls.] -> names_scrolls
* [They are thorough.] -> thorough

=== factions ===
I move between factions because factions need
middlemen. I am the bridge, the whisper, the
shadow in the corner. I know who pays whom,
who fears whom, and who believes what about
the Galilean from Nazareth. Knowledge is
power — and I trade in both.

* [You are a useful middleman.] -> useful_middleman
* [Knowledge without wisdom is dangerous.] -> knowledge_wisdom
* [You are playing a dangerous game.] -> dangerous_game

=== fear_control ===
They fear losing control of a situation that is
sliding through their fingers. The Temple courts
were cleansed. The crowd was stirred. The
prophecy was invoked. And now — now they
cannot predict what will happen next.

* [The unpredictability terrifies them.] -> unpredictability
* [Control through information.] -> control_info
* [The net is tightening.] -> net_tightening

=== prediction_not_control ===
Prediction is not control. They think knowing
what the Teacher will do next gives them power
over Him. But He sees their plans. He knows
their hearts. And He acts anyway.

* [The Teacher is two steps ahead.] -> two_steps_ahead
* [Prediction without prevention.] -> prediction_prevention
* [They are outmaneuvered.] -> outmaneuvered

=== fickle_crowd ===
The crowd is fickle — today shouting "Hosanna,"
tomorrow demanding "Crucify." But the Teacher
does not court popularity. He speaks truth.
And truth outlasts the crowd.

* [Truth over popularity.] -> truth_popularity
* [The crowd's fickleness.] -> crowd_fickleness
* [The Teacher's consistency.] -> teacher_consistency

=== sanhedrin_silver ===
Seventy pieces of silver. The price of a slave —
Exodus 21:32, weighed and measured by the shekel.
The Sanhedrin values the Teacher's life at
precisely the legal minimum. But they pay more
for information about His disciples.

* [They value silver over souls.] -> silver_over_souls
* [The price is insultingly low.] -> price_low
* [Their valuation reveals their hearts.] -> hearts_revealed

=== facilitated_betrayal ===
Facilitated? I provided information that led to
a meeting in the shadows. A discussion of silver.
A plan that was set in motion. Whether that
constitutes betrayal — that depends on your
definition of loyalty.

* [Loyalty has many faces.] -> loyalty_faces
* [I am a merchant of facts.] -> merchant_facts
* [The information was accurate.] -> information_accurate

=== slave_price ===
Seventy pieces of silver. The price of a
slave's life. The Sanhedrin's valuation of
the Teacher. Coincidence? I think not. The
prophecy was written centuries before. And
the fulfillment was arranged centuries before
that.

* [Prophecy fulfilled precisely.] -> prophecy_fulfilled
* [The price speaks volumes.] -> price_speaks
* [Coincidence is not coincidence.] -> not_coincidence

=== valuable_intel ===
Movement patterns. Disciple locations.
Meeting times. Safe houses. Escape routes.
The Teacher's schedule. His companions.
His methods. All valuable to those who
seek to understand — or contain —
the movement.

* [Knowledge is a weapon.] -> knowledge_weapon
* [Information is currency.] -> info_currency
* [Every detail has a price.] -> detail_price

=== coin_preference ===
Coin to favors, scribe? Always. Favors
expire. Coin endures. The Sanhedrin
pays in shekels that can be melted
down and carried across borders.
A favor from a Roman centurion?
Not so portable.

* [Practical preferences.] -> practical
* [Coin has universal value.] -> universal_value
* [Favors are promises.] -> favors_promises

=== expensive_services ===
My services are expensive because
the truth is expensive. The Sanhedrin
pays me well to stay silent. The Zealots
pay me well to stay accurate. And you?
What will you pay for the truth?

* [The truth has a price.] -> truth_price
* [What is truth worth?] -> truth_worth
* [Some prices cannot be paid.] -> cannot_pay

=== surveillance_network ===
The Sanhedrin's surveillance network
spans the city. Gate guards. Market
watchers. Temple attendants. Household
servants. Every eye has its price.
Every ear has its loyalty. And every
movement is tracked through the
labyrinth of Jerusalem's streets.

* [The web is extensive.] -> web_extensive
* [Information flows like water.] -> info_flows
* [No movement goes unnoticed.] -> unnoticed

=== names_scrolls ===
Names on scrolls. Lists of disciples.
Lists of sympathizers. Lists of threats.
The Sanhedrin maintains archives of
who believes what, who follows whom,
and who might act on what they believe.
The Teacher's name is at the top of
every list.

* [The lists grow longer.] -> lists_grow
* [Belief is catalogued.] -> belief_catalogued
* [The Teacher is the primary target.] -> primary_target

=== thorough ===
Thorough? They cross-reference
tax records with synagogue rolls.
They track movement through the
gates. They monitor the markets.
They have informants in the
upper rooms. They have eyes
on the Garden of Gethsemane.
They are thorough indeed.

* [Their thoroughness is impressive.] -> impressive_thorough
* [No stone goes unturned.] -> stone_unturned
* [They are desperate.] -> desperate

=== useful_middleman ===
A useful middleman. I bridge the
gap between the information that
exists and the people who need
it. I translate gossip into
intelligence. I convert rumors
into facts. And I profit
from the conversion.

* [Translation is an art.] -> translation_art
* [Facts are more valuable than gossip.] -> facts_valuable
* [The conversion is profitable.] -> profitable_conversion

=== knowledge_wisdom ===
Knowledge without wisdom is
dangerous — to the knower.
I know who pays whom and
what they want to know. But
do I know what to do with
that knowledge? Selling it
is one thing. Understanding
it is another.

* [Understanding is harder than knowing.] -> harder_understanding
* [I sell facts, not wisdom.] -> facts_not_wisdom
* [The danger is in the telling.] -> danger_telling

=== dangerous_game ===
A dangerous game? Of course it
is dangerous. Everyone plays
it. The priests play it.
The soldiers play it.
The disciples play it.
I just play it better.

* [Better, but not safer.] -> better_not_safer
* [Everyone has something to hide.] -> something_hide
* [The game is universal.] -> game_universal

=== unpredictability ===
The unpredictability is
what keeps the Sanhedrin
awake at night. They can
track the disciples. They
can monitor the crowds.
They can predict the
schedule. But they cannot
predict the miracles.
And the miracles
change everything.

* [Miracles defy prediction.] -> miracles_unpredictable
* [The unknown is the threat.] -> unknown_threat
* [They fear what they cannot control.] -> fear_unknown

=== control_info ===
Control through information.
But information is not
control. It is only the
beginning of the illusion
of control. The Teacher
does what the priests
cannot predict. He
creates what they
cannot calculate.

* [Illusion of control.] -> control_illusion
* [The Teacher transcends prediction.] -> transcends_prediction
* [Information is not power over reality.] -> info_not_power

=== net_tightening ===
The net is tightening.
The circle is closing.
The noose is
tightening. And the
Teacher — the Teacher
walks into it
knowingly. He
knows
what
is
coming.
And
he
goes
anyway.

* [He goes willingly.] -> willingly
* [The net cannot hold him.] -> net_hold
* [He knows their plans.] -> knows_plans

=== two_steps_ahead ===
The Teacher is
two steps ahead.
Three. Ten.
He sees
the plan
forming in
the council
chambers.
He hears
the whispers
in the
marketplace.
He knows
what is
being prepared.
And he
welcomes
it.

* [He welcomes the cross.] -> welcomes_cross
* [He has counted the cost.] -> counted_cost
* [The plan defeats itself.] -> plan_defeats

=== prediction_prevention ===
Prediction without
prevention. The priests
think knowing what
He will do gives them
power to stop it. They
do not understand —
the Teacher chooses
to be where they
predict He will be.

* [Voluntary surrender.] -> voluntary_surrender
* [Prediction enables, not prevents.] -> enables_not_prevents
* [They cannot trap what they can predict.] -> cannot_trap

=== outmaneuvered ===
Outmaneuvered? They
try. They plot. They
scheme. But the
Teacher sees the plot
before the scheme
is complete. And the
scheme — the scheme
becomes the
prophecy.
The very
thing they
do to
destroy
him
becomes
the
thing
that
proves
who
he
is.

* [Their scheme becomes scripture.] -> scheme_scripture
* [They fulfill without knowing.] -> fulfill_unknowingly
* [The irony is divine.] -> divine_irony

=== truth_popularity ===
Truth over
popularity.
The Teacher
speaks
truth
even
when
it
threatens
his
popularity.
Even
when
it
threatens
his
safety.
Even
when
it
threatens
his
life.
Because
truth
is
worth
more
than
applause.

-> DONE

=== crowd_fickleness ===
The crowd's
fickleness
is predictable.
Today —
"Hosanna!"
Tomorrow —
"Crucify!"
But the
Teacher's
consistency
is
not.
He
speaks
truth
in
both
seasons.

* [The Teacher endures.] -> teacher_endures
* [Truth outlasts the crowd.] -> truth_outlasts
* [Consistency in inconsistency.] -> consistency_all

=== teacher_consistency ===
The Teacher's
consistency
in a
world of
inconsistency
is itself
a
testimony.
The crowd
changes.
The priests
change.
The
soldiers
change.
But
the
Teacher
—
he
is
the
same
yesterday,
today,
and
forever.

* [He is the constant.] -> constant
* [In a changing world.] -> changing_world
* [The rock of truth.] -> rock_truth

=== silver_over_souls ===
They value
silver
over
souls.
Seventy
pieces
of
silver
for
a
soul
that
could
move
mountains
with
a
word.
They
value
information
over
integrity.
They
value
control
over
truth.

* [Their priorities are inverted.] -> inverted_priorities
* [The value is immeasurable.] -> immeasurable_value
* [They cannot quantify grace.] -> cannot_quantify

=== price_low ===
The price
is insultingly
low. Seventy
pieces of
silver for
a life that
heals the
sick, feeds
the hungry,
welcome
s the
outcast,
and speaks
to the
heart of
God. The
Sanhedrin
has valued
eternity
at
thirty-three
denarii.

* [Eternity has infinite value.] -> infinite_value
* [They have misvalued everything.] -> misvalued
* [Their scales are broken.] -> scales_broken

=== hearts_revealed ===
The price
reveals
their
hearts.
A heart
that
can
value
thirty
pieces
of
silver
above
eternal
truth —
a heart
that
can
trade
information
for
coin
—
a heart
that
can
watch
a man
die
for
their
comfort
— these
hearts
are
not
guided
by
wisdom.
They
are
guided
by
fear.

* [Fear, not wisdom.] -> fear_not_wisdom_info
* [The hearts are hardened.] -> hearts_hardened
* [Revealed in the pricing.] -> revealed_pricing

=== truth_price ===
The
truth
has
a
price.
Not
because
truth
wants
payment.
But
because
men
demand
payment
for
what
they
have
suppressed.
The
truth
costs
what
the
suppressors
demand.

* [Truth should be free.] -> truth_free
* [But men make it costly.] -> men_costly
* [The price is in the telling.] -> price_telling

=== truth_worth ===
What
is
truth
worth?
Ask
the
priests
who
paid
for
silence.
Ask
the
soldiers
who
accepted
bribes.
Ask
the
woman
caught
in
adultery.
Truth
is
worth
everything
to
those
who
have
found
it.
And
worthless
to
those
who
have
lost
it.

* [The price varies by buyer.] -> varies_buyer
* [Truth is priceless.] -> priceless
* [Some pay, some receive.] -> pay_receive

=== cannot_pay ===
Some
prices
cannot
be
paid.
Not
in
silver.
Not
in
gold.
Not
in
favors.
Not
in
influence.
The
truth
that
comes
from
God
is
more
than
all
the
wealth
of
the
world.
Some
gifts
are
only
given.

* [Grace is given, not bought.] -> grace_not_bought
* [The gift surpasses payment.] -> gift_surpasses
* [The price was paid long ago.] -> price_paid

=== practical ===
Preferences
that
keep
you
alive
in
this
city.
Favors
expire
at
the
whim
of
he who
grants
them.
Coin
endures
in
the
hand
that
holds
it.
Practical
men
understand
the
difference.

-> DONE

=== universal_value ===
Coin has
universal
value.
A
shekel
in
Caesarea
is
worth
a
shekel
in
Alexandria.
A
favor
in
the
Praetorium
is
worth
nothing
in
the
marketplace.
Coin
speaks
the
language
of
commerce.
Favors
speak
only
to
those
who
grant
them.

* [Money talks, favors whisper.] -> money_talks
* [Universal currency.] -> universal_currency
* [Coin buys safety.] -> coin_safety

=== favors_promises ===
Favors
are
promises.
Promises
are
fragile.
They
break
in
storms.
They
fade
in
time.
They
are
forgotten
when
power
shifts.
Coin
is
fact.
Promise
is
hope.
Fact
endures.
Hope
flees.

* [Fact over hope.] -> fact_hope
* [Promises break.] -> promises_break
* [The reliable pays in coin.] -> reliable_coin

=== truth_free ===
Truth
should
be
free.
Preached
by
prophets.
Lived
by
saints.
Given
by
the
Spirit.
But
in
this
city —
in
this
world —
truth
has
been
weaponized.
And
those
who
profit
from
its
absence
demand
payment
for
its
presence.

* [Weaponized truth.] -> weaponized
* [Payment for absence.] -> payment_absence
* [The weapon is turned.] -> weapon_turned

=== men_costly ===
Men
make
it
costly.
Not
because
they
want
to.
But
because
they
must.
A
man
who
sells
information
about
his
neighbors
has
already
sold
his
own
soul.
He
must
continue
selling
to
justify
the
first
sale.

* [The first sale is the deepest.] -> first_sale
* [Each sale compounds the loss.] -> compounds_loss
* [The spiral continues.] -> spiral_continues

=== price_telling ===
The
price
is
in
the
telling.
To
those
who
listen,
the
truth
is
priceless.
To
those
who
profit
from
silence,
the
truth
is
expensive.
I am
the
messenger.
The
price
is
not
mine
to
set.

* [The messenger is neutral.] -> neutral_messenger
* [The price is set by demand.] -> demand_sets
* [The messenger pays too.] -> messenger_pays

=== grace_not_bought ===
Grace
is
given,
not
bought.
Mercy
is
extended,
not
sold.
Truth
is
revealed,
not
marketed.
But
in
this
city,
even
grace
has
been
commodified.
Even
mercy
has
been
priced.
Even
truth
has
been
weighed.

* [The weighing begins.] -> weighing_begins
* [Grace transcends markets.] -> grace_markets
* [The commodity is priceless.] -> priceless_commodity

=== gift_surpasses ===
The
gift
surpasses
the
payment.
The
truth
surpasses
the
price.
The
kingdom
surpasses
all
the
silver
in
the
Temple
treasury.
Those
who
see
this
understand.
Those
who
do not —
they
will
pay
the
price.

* [The price will be exacted.] -> price_exact
* [The gift is greater.] -> gift_greater
* [Salvation is priceless.] -> salvation_priceless

=== price_paid ===
The
price
was
paid
long
ago.
Not
in
silver.
Not
in
gold.
But
in
blood.
In
sweat.
In
tears.
In
a
life
given
for
the
truth
that
sets
men
free.
I
trade
in
facts.
But
the
greatest
fact
is
that
freedom
is
free.

* [Freedom is free.] -> freedom_free
* [The blood speaks.] -> blood_speaks
* [The greatest fact.] -> greatest_fact

=== weaponized ===
Truth
weaponized.
That
is
what
has
happened
in
this
city.
The
priests
use
lies
to
protect
their
power.
The
soldiers
use
force
to
maintain
their
order.
The
crowd
uses
noise
to
influence
their
leaders.
And
the
Teacher
—
the
Teacher
uses
truth
to
set
them
all
free.

* [The free are dangerous.] -> free_dangerous
* [Truth disarms the world.] -> disarms
* [The weapon is turned on itself.] -> weapon_turned

=== payment_absence ===
Payment
for
absence.
For
silence.
For
secrets
kept.
For
truths
hidden.
The
priests
pay
well
for
what
is
suppressed.
But
suppressed
truth
has
weight.
And
weight
has
momentum.
And
momentum
—
momentum
cannot
be
bought
off
with
silver.

* [Weight builds momentum.] -> momentum
* [Momentum carries truth.] -> carries_truth
* [Silver cannot silence inevitability.] -> cannot_silence

=== weapon_turned ===
The
weapon
is
turned.
The
lies
that
suppressed
truth
now
testify
against
the
suppressors.
The
silence
that
was
bought
now
speaks
louder
than
the
voices
that
paid
for
it.
The
truth
that
was
sold
now
frees
the
seller.

* [The seller becomes the freed.] -> seller_freed
* [Truth speaks through silence.] -> speaks_silence
* [The weight of silver.] -> weight_silver

=== messenger_pays ===
The
messenger
pays
too.
Every
piece
of
information
sold.
Every
secret
kept.
Every
truth
suppressed.
The
messenger
carries
the
weight
of
the
knowledge.
And
the
weight
grows
heavier
with
each
transaction.

* [The weight grows.] -> weight_grows
* [The messenger seeks release.] -> seeks_release
* [Truth sets the messenger free.] -> messenger_free

=== messenger_free ===
Truth
sets
the
messenger
free.
Not
from
the
consequences.
But
from
the
weight
of
carrying
them
alone.
The
messenger
who
speaks
the
truth
—
he
joins
the
truth
to
the
other
truths
that
refuse
to
be
silenced.

* [The messenger joins the movement.] -> joins_movement
* [Truth multiplies.] -> truth_multiplies
* [Freedom in speaking.] -> freedom_speaking

=== joins_movement ===
The
messenger
joins
the
movement.
Not
with
a
sword.
Not
with
a
revolution.
But
with
a
voice.
With
a
truth.
With
a
willingness
to
say
what
he
has
seen.
And
the
movement
grows
not
by
conquest
but
by
conviction.

* [Conviction over conquest.] -> conviction
* [The movement grows.] -> grows
* [The messenger becomes a witness.] -> witness

-> DONE

=== closing ===
Information has a price.
Names have a price.
Silence also has a price.
The choice is yours —
buy the truth or bear
the cost of its absence.
Choose wisely, scribe.
Your investigation
depends on it.

-> DONE