import { ScoreCardProps } from '@/types/report'

const ScoreCard = ({ title, score, rating }: ScoreCardProps) => {
  return (
    <div className='p-6 border rounded-xl'>
      <h3 className='text-xl font-medium text-primary'>{title}</h3>
      <h4 className={`text-3xl font-bold mt-2 ${rating === 'good' ? 'text-accent-three' : rating === 'poor' ? 'text-accent-two' : 'text-accent-one'}`}>{score}</h4>
      <h4 className={`text-xl font-light  mt-2 ${rating === 'good' ? 'text-accent-three' : rating === 'poor' ? 'text-accent-two' : 'text-accent-one'}`}>{rating}</h4>
    </div>
  )
}

export default ScoreCard;