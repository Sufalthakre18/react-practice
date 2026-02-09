function Card(props) {
  return (
    <>
      {props.cardsData.cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="heading">
            <h1>{card.title}</h1>
            <h3>{card.subtitle}</h3>
          </div>

          <div>
            <div>
              <p>{card.description}</p>
              <button onClick={() => window.location.href = card.action.url}>
                {card.action.label}
              </button>
            </div>

            <div>
              <img src={card.imageUrl} alt={card.title} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
