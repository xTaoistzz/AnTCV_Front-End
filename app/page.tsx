

const get = async() => {
  const res = await fetch('/api/test');
  const data = await res.json
}

export default function Page(){
  
  return (
    <div>Heelo
      
    </div>
  )
}